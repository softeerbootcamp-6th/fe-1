import { renderComponent } from "../../utils/render.js";
import ItemsState from "../../store/ItemsState.js";
import FilterState from "../../store/FilterState.js";
import { groupItemsByDate } from "../../utils/group.js";
import { calculateSummary } from "../../utils/summary.js";
import { formatDate } from "../../utils/date.js";

function createTransactionItemsFilterBar() {
  const filter = FilterState.getFilter();
  const filteredItems = ItemsState.getItems().filter((item) => {
    if (item.type === "deposit" && !filter.income) return false;
    if (item.type === "withdraw" && !filter.expense) return false;
    if (!item.date.startsWith(filter.month)) return false;
    return true;
  });
  const totalCount = filteredItems.length;
  const summary = calculateSummary(filteredItems);
  const income = summary.deposit.toLocaleString();
  const expense = summary.withdraw.toLocaleString();

  return `
    <div class="transaction-filter-bar font-light-12">
      <div class="filter-bar-left">
        <span class="filter-total-label">전체 내역</span>
        <span class="filter-total-count">${totalCount}건</span>
      </div>
      <div class="filter-bar-right">
        <label class="filter-checkbox">
          <input type="checkbox" ${filter.income ? "checked" : ""} />
          <span class="check-icon"></span>
          <span>수입</span>
          <span class="filter-income-amount">${income}원</span>
        </label>
        <label class="filter-checkbox">
          <input type="checkbox" ${filter.expense ? "checked" : ""} />
          <span class="check-icon"></span>
          <span>지출</span>
          <span class="filter-expense-amount">${expense}원</span>
        </label>
      </div>
    </div>
  `;
}

function createTransactionItemInnerHtml(item) {
  const amount = Number(item.amount);
  return `
        <div class="item" data-id="${item.id}">
          <div class="item-category-tag item-category-${
            item.category
          } font-light-14">${item.category}</div>
      <div class="item-content">
          <p class="item-description font-light-14">${item.description}</p>
          <p class="item-method font-light-14">${item.method}</p>
          <div class="flex-row-between">
          <div class="item-amount ${
            item.type === "withdraw" ? "minus" : "plus"
          } font-light-14">
            ${item.type === "withdraw" ? "-" : "+"}${amount.toLocaleString()}원
          </div>
          <button class="delete-btn">
          <img src="src/assets/icons/closed.svg"/>
          </button>
          </div>
        </div>
      </div>
      `;
}

function createDaySectionInnerHtml(dateStr, items) {
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

  const itemHTML = items.map(createTransactionItemInnerHtml).join("");

  return `
        <div class="day-section">
          <div class="day-header font-serif-14">
            <span class="date">${dateTitle}</span>
            <span class="summary">${summaryText}</span>
          </div>
          <div class="transactions-container">
            ${itemHTML}
          </div>
        </div>
      `;
}

function createDaySectionListInnerHtml() {
  const filter = FilterState.getFilter();
  const items = ItemsState.getItems().filter((item) => {
    if (item.type === "deposit" && !filter.income) return false;
    if (item.type === "withdraw" && !filter.expense) return false;
    if (!item.date.startsWith(filter.month)) return false;
    return true;
  });
  const grouped = groupItemsByDate(items);
  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  let innerHTML = "";
  sortedDates.forEach((dateStr) => {
    const html = createDaySectionInnerHtml(dateStr, grouped[dateStr]);
    innerHTML += html;
  });
  return innerHTML;
}

export function renderTransactionList() {
  let innerHTML = "";
  innerHTML += createTransactionItemsFilterBar();
  innerHTML += createDaySectionListInnerHtml();
  renderComponent({
    id: "transaction-list",
    innerHTML,
  });
}
