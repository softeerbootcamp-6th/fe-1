import { formatAmount } from "../../../../utils/format-utils.js";

// 요약 문자열 업데이트 함수
export function updateSummaryText(totalCount, totalIncome, totalExpense) {
  const summaryB = document.querySelectorAll(".summary-row b");
  if (summaryB.length >= 3) {
    summaryB[0].textContent = `${totalCount}건`;
    summaryB[1].textContent = formatAmount(totalIncome);
    summaryB[2].textContent = formatAmount(totalExpense);
  }
}
