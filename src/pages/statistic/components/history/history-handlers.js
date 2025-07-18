import { loadCSS } from "../../../../store/routing-store.js";
import { renderHistoryListWithFilter } from "../../../main/utils/main-ui-utils.js";
import { getFilteredExpenseDataByCategory } from "../../../../utils/data-utils.js";

// 통계 페이지용 카테고리별 지출 내역 렌더링 함수
export async function renderExpenseHistoryList(transactions, category) {
  //TODO[규진] - 메인 페이지 스타일 로드(추후에 시간이 남으면 컴포넌트화 후 해당 컴포넌트만 로드하도록 수정)
  loadCSS("src/pages/main/main.css");

  // 확장된 렌더링 함수 사용
  return renderHistoryListWithFilter(transactions, (data) =>
    getFilteredExpenseDataByCategory(data, category)
  );
}

export function initHistoryList() {
  const historyListEl = document.getElementById("history-list");
  if (historyListEl) {
    historyListEl.innerHTML = "";
  }
}
