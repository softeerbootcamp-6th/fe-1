import { store } from "../../store/store.js";
import { sharedState } from "../../store/state.js";
import { updateTotalAmounts } from "../totalAmount/totalAmount-util.js";
import { category } from "../../setting/config.js";
import { saveEntriesToServer } from "../../../api.js";
import { updateDateSectionTotals } from "../entries/entryTotalAmount.js";

export function addEntry() {
  const entry = getEntryDate();
  sharedState.entries.push(entry);
  addEntryToDOM(entry);
  updateTotalAmounts();

  document.getElementById("date").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("amount").placeholder = "0";

  store.setState({
    selectedMethod: null,
    selectedCategory: null,
  });
  const display = document.getElementById("dropdown-display");
  display.textContent = "결제수단 선택";
  const categoryDisplay = document.getElementById("category-display");
  categoryDisplay.textContent = "선택하세요";
}

export function getEntryDate() {
  const {
    isIncome,
    selectedCategory,
    selectedMethod,
    entryId: id,
  } = store.getState();

  const date = document.getElementById("date").value;
  const rawAmount = document.getElementById("amount").value.replace(/,/g, "");
  const amount = Number(rawAmount);
  const desc = document.getElementById("desc").value;
  if (!date || !amount || !desc) {
    alert("모든 항목을 정확히 입력해주세요!");
    return;
  }
  store.setState({ entryId: null }); // 수정 ID 초기화
  return {
    id,
    date,
    amount,
    desc,
    method: selectedMethod,
    category: selectedCategory,
    isIncome: isIncome, // 수입/지출 여부 저장
  };
}

function isExistingEntry(entry) {
  return sharedState.entries.some(
    (existingEntry) => existingEntry.id === entry.id
  );
}

//--------------------

export async function addEntryToDOM(entry) {
  // if (isExistingEntry(entry)) {
  //   // 이미 존재하는 항목이면 업데이트만 수행
  //   const existingItem = document.querySelector(
  //     `.entry-row[data-id="${entry.id}"]`
  //   );
  //   if (existingItem) {
  //     existingItem.querySelector(".entry-category").textContent =
  //       entry.category;
  //     //카테고리 색상 업데이트

  //     const date = new Date(entry.date);
  //     const yearMonth =
  //       date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0");
  //     updateDataToServer(yearMonth, entry);
  //     location.reload(); // 페이지 새로고침
  //     return;
  //   }
  // }

  const entryList = document.getElementById("entry-list");

  const dateObj = new Date(entry.date);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const weekday = ["일", "월", "화", "수", "목", "금", "토"][dateObj.getDay()];
  const dateLabel = `${month}월 ${day}일 ${weekday}요일`;

  const { currentMonth, currentYear } = store.getState();

  if (
    dateObj.getFullYear() !== currentYear ||
    dateObj.getMonth() + 1 !== currentMonth
  ) {
    const yearMonth =
      dateObj.getFullYear() +
      "-" +
      String(dateObj.getMonth() + 1).padStart(2, "0");
    saveEntriesToServer(yearMonth, entry);
    return;
  }

  let dateSection = entryList.querySelector(`[data-date="${entry.date}"]`);
  if (!dateSection) {
    dateSection = document.createElement("div");
    dateSection.className = "entry-date-section";
    dateSection.setAttribute("data-date", entry.date);
    dateSection.innerHTML = `
        <div class="entry-sort">
          <div>${dateLabel}</div>
          <div class="entry-amount-section">
            <div>수입</div>
            ${entry.amount}
            <div>지출</div>
            ${entry.amount}
          </div>
        </div>
        <div class="entry-items"></div>
      `;
    entryList.insertBefore(dateSection, entryList.firstChild);
  }

  const entryItems = dateSection.querySelector(".entry-items");
  const item = document.createElement("div");
  item.className = "entry-row";

  const sign = entry.isIncome ? "" : "-";
  const amountClass = entry.isIncome ? "income-amount" : "expense-amount";

  item.setAttribute("data-id", entry.id);

  item.innerHTML = `
      <div class="entry-category ${category[entry.category]}">${
    entry.category
  }</div>
      <div class="entry-desc">${entry.desc}</div>
      <div class="entry-method">${entry.method}</div>
      <div class="entry-amount-delete">
        <div class="entry-amount ${amountClass}">${sign}${entry.amount.toLocaleString()}원</div>
        <div class="delete-btn">
          <div class="delete-icon-wrapper">
          <img src="../../assets/icons/delete-botton.svg" alt="삭제" class="delete-icon"></img>
          삭제
          </div>
        </div>
      </div>
    `;
  entryItems.appendChild(item);
  const yearMonth =
    dateObj.getFullYear() +
    "-" +
    String(dateObj.getMonth() + 1).padStart(2, "0");
  saveEntriesToServer(yearMonth, entry);

  // 해당 날짜의 수입/지출 총액 업데이트
  updateDateSectionTotals(entry.date);
}
