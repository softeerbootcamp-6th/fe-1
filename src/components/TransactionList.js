import { items as DummyItem } from "../constants/items.js";
import { state, setState, addObservers } from "../store.js";
import { groupItemsByDate } from "../utils/group.js";
import { calculateSummary } from "../utils/summary.js";
import { formatDate } from "../utils/date.js";

// 상태 변경 감지 및 자동 리렌더링
addObservers((data) => {
  if (data.items) {
    renderTransactionList();
  }
});

// 초기 데이터를 상태에 설정 (한 번만 실행)
if (state.items.length === 0) {
  const initialItems = DummyItem;
  setState({ items: initialItems });
}

/* 아이템 삭제 함수 */
function deleteItem(itemId) {
  const currItems = state.items;
  const updatedItems = currItems.filter((item) => item.id !== itemId);
  setState({ items: updatedItems });
}

function renderTransactionItem(item) {
  const amount = Number(item.amount);
  return `
      <div class="flex-row-between item" data-id="${item.id}">
        <div class="category">${item.category}</div>
        <p class="description">${item.description}</p>
        <p class="method">${item.method}</p>
        <div class="flex-row-between">
        <div class="amount ${item.type === "withdraw" ? "minus" : "plus"}">
          ${item.type === "withdraw" ? "-" : "+"}${amount.toLocaleString()}원
        </div>
        <button class="delete-btn">삭제</button>
        </div>
      </div>
    `;
}

function renderDaySection(dateStr, items) {
  const summary = calculateSummary(items);
  const dateTitle = formatDate(dateStr);
  const summaryText =
    summary.deposit > 0
      ? `수입 ${summary.deposit.toLocaleString()}원 ${
          summary.withdraw > 0
            ? "지출 " + summary.withdraw.toLocaleString() + "원"
            : ""
        }`
      : `지출 ${summary.withdraw.toLocaleString()}원`;

  const itemHTML = items.map(renderTransactionItem).join("");

  return `
      <div class="day-section">
        <div class="day-header">
          <span class="date">${dateTitle}</span>
          <span class="summary">${summaryText}</span>
        </div>
        <div class="transactions-container">
          ${itemHTML}
        </div>
      </div>
    `;
}

export function renderTransactionList() {
  const container = document.getElementById("transaction-list");
  container.innerHTML = "";

  // 상태에서 items 가져오기
  const items = state.items;

  const grouped = groupItemsByDate(items);
  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  sortedDates.forEach((dateStr) => {
    const html = renderDaySection(dateStr, grouped[dateStr]);
    container.innerHTML += html;
  });
  return container;
}

export function initEventListeners() {
  const container = document.getElementById("transaction-list");

  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const itemElement = e.target.closest(".item");
      const itemId = parseInt(itemElement.dataset.id);
      deleteItem(itemId);
    }
  });
}
