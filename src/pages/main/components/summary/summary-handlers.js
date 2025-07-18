import { getFilteredDataWithCondition } from "../../../../utils/data-utils.js";
import { formatAmount } from "../../../../utils/format-utils.js";
import { renderHistoryListWithFilter } from "../../utils/main-ui-utils.js";
import { transactionUtils } from "../../../../store/transaction-store.js";

// 필터 상태를 저장할 객체
const filterState = {
  income: true,
  expense: true,
};

// 체크박스 상태에 따라 아이콘 업데이트
function updateCheckboxIcon(element, isChecked) {
  const iconPath = isChecked
    ? "assets/icons/checkbox.svg"
    : "assets/icons/uncheckbox.svg";
  element.src = iconPath;
}

// 금액 업데이트 함수
export async function updateAmounts() {
  const transactions = transactionUtils.getCurrentTransactions();
  const filteredData = getFilteredDataWithCondition(transactions);

  let incomeAmount = 0;
  let expenseAmount = 0;

  filteredData.forEach((item) => {
    if (item.amount > 0) {
      incomeAmount += item.amount;
    } else {
      expenseAmount += Math.abs(item.amount);
    }
  });

  // 금액 표시 업데이트
  document.getElementById("income-amount").textContent =
    formatAmount(incomeAmount);
  document.getElementById("expense-amount").textContent =
    formatAmount(expenseAmount);
}

// 필터링된 데이터를 가져오는 함수
function getFilteredTransactions(data) {
  // 먼저 이번 달 데이터로 필터링
  const thisMonthData = getFilteredDataWithCondition(data);

  // 그 다음 수입/지출 필터 적용
  return thisMonthData.filter((item) => {
    const isIncome = item.amount > 0;
    return (
      (isIncome && filterState.income) || (!isIncome && filterState.expense)
    );
  });
}

// 체크박스 클릭 이벤트 핸들러
async function handleFilterClick(event) {
  const filterItem = event.currentTarget;
  const filterType = filterItem.dataset.filter;
  const checkboxIcon = filterItem.querySelector(".checkbox-icon");

  // 필터 상태 토글
  filterState[filterType] = !filterState[filterType];

  // 체크박스 아이콘 업데이트
  updateCheckboxIcon(checkboxIcon, filterState[filterType]);

  // 현재 데이터로 필터링하여 렌더링
  const transactions = transactionUtils.getCurrentTransactions();
  renderHistoryListWithFilter(transactions, getFilteredTransactions);
}

// 초기화 함수
export async function initSummary() {
  // 금액 초기화
  await updateAmounts();

  // 체크박스 이벤트 리스너 등록
  document.querySelectorAll(".filter-item").forEach((item) => {
    item.addEventListener("click", handleFilterClick);
  });
}

// 요약 텍스트 업데이트 함수
export function updateSummaryText(totalCount, totalIncome, totalExpense) {
  const summaryText = document.querySelector(".summary-text");
  if (summaryText) {
    if (totalCount > 0) {
      summaryText.textContent = `전체 내역 ${totalCount}건`;
    } else {
      summaryText.textContent = "내역이 없습니다.";
    }
  }
}

// 데이터 변경 시 호출되는 함수
export async function onDataChanged() {
  // UI 업데이트
  await updateAmounts();
  const transactions = transactionUtils.getCurrentTransactions();
  renderHistoryListWithFilter(transactions, getFilteredTransactions);
}
