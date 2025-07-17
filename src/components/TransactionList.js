import { state, setState, addObservers } from "../store.js";
import { groupItemsByDate } from "../utils/group.js";
import { calculateSummary } from "../utils/summary.js";
import { formatDate } from "../utils/date.js";
import { renderComponent } from "../utils/render.js";
import { addEventListener } from "../utils/addEvent.js";

export function initTransactionList() {
  renderTransactionList();
  addEventListener({
    id: "transaction-list",
    event: "click",
    onEvent: (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const itemElement = e.target.closest(".item");
        const itemId = parseInt(itemElement.dataset.id);
        deleteItem(itemId);
      }
    },
  });
  // 상태 변경 감지 및 자동 리렌더링
  addObservers((data) => {
    if (data.items) {
      renderTransactionList();
    }
  });
}

/* 아이템 삭제 함수 */
function deleteItem(itemId) {
  const currItems = state.items;
  const updatedItems = currItems.filter((item) => item.id !== itemId);
  setState({ items: updatedItems });
}

function createTransactionItemInnerHtml(item) {
  const amount = Number(item.amount);
  return `
      <div class="item data-id="${item.id}">
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
  // 상태에서 items 가져오기
  const items = state.items;

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

function renderTransactionList() {
  renderComponent({
    id: "transaction-list",
    innerHTML: createDaySectionListInnerHtml(),
  });
}
