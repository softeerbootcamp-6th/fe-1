import {calcTotals} from '../util/totalCalc.js';
import {dayGroupHTML, entryHTML} from './summaryTemplate.js';
import {DeleteDummyData} from "../../../shared/data/dummyData.js";

// 날짜별 그룹 엘리먼트 찾기 또는 생성
const ensureGroup = ({summaryEl, date}) => {
    let group = summaryEl.querySelector(`[data-date="${date}"]`);
    if (!group) {
        summaryEl.insertAdjacentHTML('beforeend', dayGroupHTML(date));
        group = summaryEl.lastElementChild;
    }
    return group;
};

// 날짜 내림차순 정렬
const sortByDateDesc = (a, b) => new Date(b.date) - new Date(a.date);

// 수입/지출 요약 텍스트 생성
const formatSummaryText = ({calcResult}) => {
    return `수입 ${calcResult.inc.toLocaleString('ko-KR')}원   지출 ${calcResult.exp.toLocaleString('ko-KR')}원`;
};

// 선택된 연월에 해당하는 항목만 필터링
const filterEntriesByYearMonth = ({entries, year, month}) => {
    const yearMonth = `${year}-${String(month).padStart(2, '0')}`;
    return entries.filter(entry => entry.date.startsWith(yearMonth));
};

// 모든 날짜 그룹 제거
const clearDayGroups = ({summaryEl}) => {
    summaryEl.querySelectorAll('article.day-group').forEach(group => group.remove());
};

// 항목 하나를 DOM에 렌더링하는 함수
const renderSingleEntry = ({group, entry}) => {
    const entriesContainer = group.querySelector('.entries');

    // 고유 키 생성 (원래 entryHTML에서 생성된다고 가정)
    const uniqueKey = crypto.randomUUID();

    // HTML 생성 전에 고유 키 설정
    const html = entryHTML({entry, entryKey: uniqueKey});
    entriesContainer.insertAdjacentHTML('beforeend', html);

    // 방금 추가된 요소 반환
    return {
        key: uniqueKey,
        id: entry.id,
        element: entriesContainer.lastElementChild
    };
};

// 항목 목록을 DOM에 렌더링
const renderEntries = ({summaryEl, entries}) => {
    const renderedItems = [];

    entries.forEach(entry => {
        const group = ensureGroup({summaryEl, date: entry.date});
        const renderedItem = renderSingleEntry({group, entry});
        renderedItems.push(renderedItem);
    });

    return renderedItems;
};

// 키-ID 매핑 관리 함수
const updateEntryKeyMap = ({renderedElements, entryKeyMap}) => {
    renderedElements.forEach(item => {
        entryKeyMap.set(item.key, item.id);
    });
};

// 날짜별 합계 업데이트
const updateDayTotals = ({summaryEl, entries}) => {
    [...summaryEl.querySelectorAll('article.day-group')].forEach(group => {
        const dateEntries = entries.filter(entry => entry.date === group.dataset.date);
        const total = calcTotals(dateEntries);
        group.querySelector('.day-total').textContent = formatSummaryText({calcResult: total});
    });
};

// 전체 합계 업데이트
const updateTotalSummary = ({summaryEl, entries}) => {
    const totals = calcTotals(entries);
    summaryEl.querySelector('.total.count').textContent = `전체 내역 ${totals.count}건`;
    summaryEl.querySelector('.total.income-spend').textContent = formatSummaryText({calcResult: totals});
};

export const initSummaryView = ({summaryEl, summaryStore, dateStore}) => {
    // 현재 선택된 연월 상태
    let currentYear = null;
    let currentMonth = null;

    // 항목 키와 ID의 매핑을 저장하는 객체
    const entryKeyMap = new Map();

    // 현재 필터링 상태로 UI 렌더링
    const renderView = () => {
        // 기존 id와 키 매핑 초기화
        entryKeyMap.clear();

        const allEntries = summaryStore.getState().entries || [];
        const filteredEntries = filterEntriesByYearMonth({entries: allEntries, year: currentYear, month: currentMonth});
        const sortedEntries = [...filteredEntries].sort(sortByDateDesc);

        // 기존의 하드코딩된 날짜 그룹 제거
        clearDayGroups({summaryEl});

        // 날짜별 그룹 생성 및 항목 렌더링
        const renderedElements = renderEntries({summaryEl, entries: sortedEntries});
        // 항목 요소와 ID 매핑 업데이트
        updateEntryKeyMap({renderedElements, entryKeyMap});
        // 날짜별 합계 업데이트
        updateDayTotals({summaryEl, entries: filteredEntries});
        // 전체 합계 업데이트
        updateTotalSummary({summaryEl, entries: filteredEntries});
    };

    // 항목 삭제 처리
    const handleEntryDelete = (e) => {
        const deleteButton = e.target.closest('.delete-btn');
        if (!deleteButton) return;

        const entryItem = deleteButton.closest('.entry');

        if (!entryItem || !entryItem.dataset.entryKey) return;

        // 키-ID 맵에서 실제 ID 조회
        const entryKey = entryItem.dataset.entryKey;
        const entryId = entryKeyMap.get(entryKey);

        if (!entryId) return;

        DeleteDummyData(entryId).then(() => {
                // 성공적으로 삭제된 후 상태 업데이트
                summaryStore.dispatch('ENTRY/REMOVE', {id: entryId});
            }
        ).catch(
            (error) => {
                console.error('Error deleting entry:', error);
            }
        )
    };

    // dateStore 상태 변경 처리
    const handleDateChange = (state) => {
        if (state.year !== currentYear || state.month !== currentMonth) {
            currentYear = state.year;
            currentMonth = state.month;
            renderView();
        }
    };

    // 이벤트 리스너 등록
    summaryEl.addEventListener('click', handleEntryDelete);

    // Store 구독
    summaryStore.subscribe(renderView);
    dateStore.subscribe(handleDateChange);

    // 초기 상태 설정
    const dateState = dateStore.getState();
    if (dateState && dateState.year && dateState.month) {
        currentYear = dateState.year;
        currentMonth = dateState.month;
    }

    // 초기 렌더링
    renderView();
};