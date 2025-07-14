import { calcTotals } from '../util/totalCalc.js';
import { dayGroupHTML, entryHTML } from './summaryTemplate.js';

export const initSummaryView = ({ summaryEl, store }) => {
    // date를 기준으로 그룹 내의 가장 마지막 element를 반환
    const ensureGroup = (date) => {
        // summaryEl에서 해당 날짜의 그룹(article Tag)이 있는지 확인
        let g = summaryEl.querySelector(`[data-date="${date}"]`);
        if (!g) {
            // 해당 날짜의 그룹이 없으면 새로 생성, beforeend를 사용하여 summaryEl의 마지막에 추가
            // beforeend: Just inside the element, after its last child.
            summaryEl.insertAdjacentHTML('beforeend', dayGroupHTML(date));
            g = summaryEl.lastElementChild;
        }
        return g;
    };

    //
    const render = (state) => {
        // 기존의 모든 날짜 그룹(html에 하드코딩된 것들)을 제거
        summaryEl.querySelectorAll('article.day-group').forEach(e => e.remove());
        // 최신날짜 순으로 정렬
        state.entries.sort((a, b) =>
            new Date(b.date) - new Date(a.date)).forEach(ent => {
                // 해당 날짜의 그룹의 가장 마지막 element를 가져옴
                const g = ensureGroup(ent.date);
                // 해당 날짜의 그룹에 새 항목(li)을 추가
                g.querySelector('.entries').insertAdjacentHTML('beforeend', entryHTML(ent));
            });

        // summaryEl의 모든 day-group(article Tag) 요소를 가져옴
        [...summaryEl.querySelectorAll('article.day-group')].forEach(g => {
            // 각 그룹의 날짜를 기준으로 총합을 계산
            const date = g.dataset.date;
            const allInGroup = calcTotals(state.entries.filter(e => e.date === date));
            g.querySelector('.day-total').textContent = `수입 ${allInGroup.inc.toLocaleString('ko-KR')}원   지출 ${allInGroup.exp.toLocaleString('ko-KR')}원`;
        });

        // 그룹 별이 아닌 전체 요약의 총합을 계산
        const all = calcTotals(state.entries);
        summaryEl.querySelector('.total.count').textContent = `전체 내역 ${all.count}건`;
        summaryEl.querySelector('.total.income-spend').textContent = `수입 ${all.inc.toLocaleString('ko-KR')}원   지출 ${all.exp.toLocaleString('ko-KR')}원`;
    };

    // 삭제 버튼 클릭 시 ***** 아직 미완성 *****
    summaryEl.addEventListener('click', e => {
        // closest를 사용하여 클릭한 요소의 상위 요소 중에서 '.delete-btn' 클래스를 가진 요소를 찾음
        const btn = e.target.closest('.delete-btn');
        // 버튼이 존재하면 해당 항목을 아이디를 이용해 store에서 제거, id를 어떻게 가져올지 아직 미정
    });

    // store의 상태가 변경될 때마다 render 함수를 호출하여 UI를 업데이트
    store.subscribe(render);
    render(store.getState());
};
