import {
  formatDateText,
  updateHeaderDate,
  updateInputDate,
} from "../../../../utils/date-utils.js";
import { formatAmount } from "../../../../utils/format-utils.js";
import { getFilteredData, deleteItem } from "../../../../utils/data-utils.js";
import { getTransactions } from "../../../../api/transaction.js";
import { enterEditMode, cancelEditMode } from "../input/input-handlers.js";
import { updateSummaryText } from "../summary/summary-handlers.js";

// 최초 렌더링 초기화
export function initializeRendering() {
  updateHeaderDate();
  updateInputDate();
  updateHistoryList();
}

// 히스토리 리스트 업데이트 함수
export async function updateHistoryList() {
  try {
    const transactions = await getTransactions();
    renderHistoryList(transactions);
  } catch (error) {
    console.error("히스토리 리스트 업데이트 실패:", error);
  }
}

// 확장 가능한 렌더링 함수 (필터링 함수를 파라미터로 받음)
export async function renderHistoryListWithFilter(
  transactions,
  filterFunction
) {
  //랜더링 할 리스트
  const historyList = document.querySelector(".history-list");
  // 필터링된 데이터
  const filteredData = filterFunction(transactions);
  // 그룹화된 데이터
  const grouped = {};

  filteredData.forEach((item) => {
    if (!grouped[item.date]) grouped[item.date] = [];
    grouped[item.date].push(item);
  });

  // 날짜 정렬
  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  // 총 수입, 총 지출, 총 건수
  let totalIncome = 0,
    totalExpense = 0;
  let totalCount = filteredData.length;

  // 랜더링 할 문자열
  let html = "";
  sortedDates.forEach((date) => {
    const items = grouped[date];
    let dayIncome = 0,
      dayExpense = 0;
    let itemsHtml = "";

    items.forEach((item) => {
      const isIncome = item.amount > 0;
      if (isIncome) dayIncome += item.amount;
      else dayExpense += -item.amount;

      itemsHtml += `
        <div class="history-item" data-id="${item.id}" style="cursor: pointer;">
          <div class="history-category category-${item.category.replace(
            "/",
            "/"
          )}">${item.category}</div>
          <div class="history-content">${item.content}</div>
          <div class="history-method">${item.method}</div>
          <div class="history-amount ${isIncome ? "plus" : "minus"}">${
        isIncome ? "" : "-"
      }${formatAmount(item.amount)}원</div>
          <div class="history-actions" style="display: none;">
            <img src="assets/icons/delete.svg" alt="삭제 아이콘"/>
            <p class="delete-btn" style=" color: #ff4444; cursor: pointer; font-size: 12px;">삭제</p>
          </div>
        </div>
      `;
    });

    // 일 총 금액
    let dayTotalText = "";
    if (dayIncome && dayExpense)
      dayTotalText = `수입 ${formatAmount(dayIncome)}원 지출 ${formatAmount(
        dayExpense
      )}원`;
    else if (dayIncome) dayTotalText = `수입 ${formatAmount(dayIncome)}원`;
    else if (dayExpense) dayTotalText = `지출 ${formatAmount(dayExpense)}원`;

    // 랜더링 할 문자열
    html += `
      <div class="history-date-group">
        <div class="history-date">${formatDateText(
          date
        )} <span class="history-total">${dayTotalText}</span></div>
        ${itemsHtml}
      </div>
    `;
    totalIncome += dayIncome;
    totalExpense += dayExpense;
  });

  // 랜더링
  historyList.innerHTML = html;

  // 요약 문자열 업데이트
  updateSummaryText(totalCount, totalIncome, totalExpense);

  // 아이템 목록 이벤트 리스너 설정
  setupHistoryItemListeners();
}

// 히스토리 아이템 이벤트 리스너 설정
export function setupHistoryItemListeners() {
  const historyList = document.querySelector(".history-list");
  const items = historyList.querySelectorAll(".history-item");

  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) return;

      // ID를 문자열로 처리 (parseInt 제거)
      const itemId = item.getAttribute("data-id");

      // 수정 모드 취소
      if (item.classList.contains("edit-mode")) {
        items.forEach((i) => i.classList.remove("edit-mode"));
        items.forEach(
          (i) => (i.querySelector(".history-actions").style.display = "none")
        );
        cancelEditMode();
        return;
      }

      // 수정 모드 진입
      enterEditMode(itemId);

      items.forEach((i) => i.classList.remove("edit-mode"));
      item.classList.add("edit-mode");

      items.forEach(
        (i) => (i.querySelector(".history-actions").style.display = "none")
      );
      item.querySelector(".history-actions").style.display = "flex";
    });
  });

  // 삭제 버튼 이벤트 리스너 설정
  setupDeleteButtonListeners();
}

// 삭제 버튼 이벤트 리스너 설정
export function setupDeleteButtonListeners() {
  const historyList = document.querySelector(".history-list");
  const items = historyList.querySelectorAll(".history-item");

  items.forEach((item) => {
    const deleteBtn = item.querySelector(".delete-btn");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        // ID를 문자열로 처리 (parseInt 제거)
        const itemId = item.getAttribute("data-id");
        deleteItem(itemId);
      });
    }
  });
}

// 렌더링 함수 수정 (기존 호환성을 위해 유지)
export async function renderHistoryList(transactions) {
  return renderHistoryListWithFilter(transactions, getFilteredData);
}
