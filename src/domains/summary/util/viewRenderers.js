import { filterEntriesByYearMonth, sortByDateDesc } from './dateUtils.js';
import { clearDayGroups, updateDayTotals } from './groupRenderer.js';
import { renderEntries, updateEntryKeyMap } from './entryRenderer.js';
import { updateTotalSummary } from './summaryRenderer.js';

// 현재 필터링 상태로 UI 렌더링
export const renderView = ({
  dateState,
  summaryStore,
  entryKeyMap,
  summaryEl,
}) => {
  // 기존 id와 키 매핑 초기화
  entryKeyMap.clear();

  const entries = summaryStore.getState().entries || [];

  const filteredEntries = filterEntriesByYearMonth({
    entries,
    year: dateState.year,
    month: dateState.month,
  });
  const sortedEntries = [...filteredEntries].sort(sortByDateDesc);

  // 기존의 하드코딩된 날짜 그룹 제거
  clearDayGroups({ summaryEl });

  // 날짜별 그룹 생성 및 항목 렌더링
  const renderedElements = renderEntries({ summaryEl, entries: sortedEntries });
  // 항목 요소와 ID 매핑 업데이트
  updateEntryKeyMap({ renderedElements, entryKeyMap });
  // 날짜별 합계 업데이트
  updateDayTotals({ summaryEl, entries: filteredEntries });
  // 전체 합계 업데이트
  updateTotalSummary({ summaryEl, entries: filteredEntries });
};
