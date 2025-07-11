import { items } from "../constants/items.js";
import { groupItemsByDate } from "../utils/group.js";
import { calculateSummary } from "../utils/summary.js";
import { formatDate } from "../utils/date.js";

function renderItemHTML(item) {
  const amount = Number(item.amount);
  return `
      <div class="flex-row-between item">
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

  const itemHTML = items.map(renderItemHTML).join("");

  return `
      <div class="day-section">
        <div class="day-header">
          <span class="date">${dateTitle}</span>
          <span class="summary">${summaryText}</span>
        </div>
        <div class="transactions">
          ${itemHTML}
        </div>
      </div>
    `;
}

export function renderTransactionItems() {
  const container = document.getElementById("transaction-list");
  container.innerHTML = "";

  const grouped = groupItemsByDate(items);
  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  sortedDates.forEach((dateStr) => {
    const html = renderDaySection(dateStr, grouped[dateStr]);
    container.innerHTML += html;
  });

  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const itemDel = e.target.closest(".item");
      itemDel.remove();
      //  삭제 이후 지출/입금 금액 리렌더링
    }
  });

  return container;
}
