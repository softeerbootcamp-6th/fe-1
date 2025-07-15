// 필터링 기능 구현
import { sharedState } from "../state/state.js";
import { updateTotalAmounts } from "./totalAmount.js";
import { updateDateSectionTotals } from "./entry.js";

export function initFilterButtons() {
  const toggleIncome = document.getElementById("total-income");
  const toggleExpense = document.getElementById("total-expense");
  
  // 초기 상태 설정 (둘 다 활성화)
  sharedState.showIncome = true;
  sharedState.showExpense = true;
  
  // 수입 클릭 이벤트
  toggleIncome.addEventListener("click", () => {
    sharedState.showIncome = !sharedState.showIncome; // 상태 토글
    toggleIncome.classList.toggle("active", sharedState.showIncome);
    applyFilters();
    
    // 수입과 지출이 모두 꺼져 있는 경우 아무것도 표시하지 않음을 알리는 메시지 표시
    showEmptyMessage();
  });
  
  // 지출 클릭 이벤트
  toggleExpense.addEventListener("click", () => {
    sharedState.showExpense = !sharedState.showExpense; // 상태 토글
    toggleExpense.classList.toggle("active", sharedState.showExpense);
    applyFilters();
    
    // 수입과 지출이 모두 꺼져 있는 경우 아무것도 표시하지 않음을 알리는 메시지 표시
    showEmptyMessage();
  });
}

// 필터링 적용 함수
function applyFilters() {
  const entryRows = document.querySelectorAll(".entry-row");
  const dateSections = document.querySelectorAll(".entry-date-section");
  
  // 각 항목에 필터 적용
  entryRows.forEach(row => {
    const isIncome = row.querySelector(".income-amount") !== null;
    
    if (isIncome) {
      // 수입 항목인 경우
      row.classList.toggle("hidden-income", !sharedState.showIncome);
    } else {
      // 지출 항목인 경우
      row.classList.toggle("hidden-expense", !sharedState.showExpense);
    }
  });
  
  // 날짜 섹션에 표시할 항목이 없는 경우 섹션 자체도 숨김
  // 그리고 각 날짜 섹션의 수입/지출 총액 업데이트
  dateSections.forEach(section => {
    const visibleEntries = section.querySelectorAll(".entry-row:not(.hidden-income):not(.hidden-expense)");
    section.classList.toggle("hidden", visibleEntries.length === 0);
    
    // 해당 날짜의 수입/지출 총액 업데이트
    const date = section.getAttribute("data-date");
    if (date) {
      updateDateSectionTotals(date);
    }
  });
  
  // 총액 업데이트
  updateTotalAmounts();
}

// 필터링 결과 빈 화면일 경우 메시지 표시
function showEmptyMessage() {
  const entryList = document.getElementById("entry-list");
  const emptyMsgId = "empty-filter-message";
  let emptyMsg = document.getElementById(emptyMsgId);
  
  if (!sharedState.showIncome && !sharedState.showExpense) {
    // 둘 다 꺼진 경우 메시지 표시
    if (!emptyMsg) {
      emptyMsg = document.createElement("div");
      emptyMsg.id = emptyMsgId;
      emptyMsg.className = "empty-filter-message";
      emptyMsg.textContent = "수입/지출 필터를 선택하세요";
      entryList.prepend(emptyMsg);
    }
  } else if (emptyMsg) {
    // 둘 중 하나라도 켜진 경우 메시지 제거
    emptyMsg.remove();
  }
}
