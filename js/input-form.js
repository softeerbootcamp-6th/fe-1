//js/input-form.js
import { updateTotalAmounts } from "./function/totalAmount.js";
import { dummyEntries } from "./dummy/dummy.js";
import { sharedState } from "./state/state.js";
import { renderCategoryOptions } from "./function/categoryRender.js";

export function initInputForm() {
  let selectedMethod = sharedState.selectedMethod; // sharedState에서 selectedMethod 요소를 가져옴
  let selectedCategory = sharedState.selectedCategory; // sharedState에서 selectedCategory 요소를 가져옴
  let isIncome = sharedState.isIncome; // 수입/지출 여부를 sharedState에서 가져옴

  const addBtn = document.getElementById("add-btn");

  const display = document.getElementById("dropdown-display");
  const categoryDisplay = document.getElementById("category-display");


  const entries = [];

  function addEntryToDOM(entry) {
    const entryList = document.getElementById("entry-list");

    const dateObj = new Date(entry.date);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const weekday = ['일', '월', '화', '수', '목', '금', '토'][dateObj.getDay()];
    const dateLabel = `${month}월 ${day}일 ${weekday}요일`;

    let dateSection = entryList.querySelector(`[data-date="${entry.date}"]`);
    if (!dateSection) {
      dateSection = document.createElement("div");
      dateSection.className = "entry-date-section";
      dateSection.setAttribute("data-date", entry.date);
      dateSection.innerHTML = `
        <div class="entry-sort">
          <div>${dateLabel}</div>
          <div>${entry.amount}</div>
        </div>
        <div class="entry-items"></div>
      `;
      entryList.insertBefore(dateSection, entryList.firstChild);
    }

    const entryItems = dateSection.querySelector(".entry-items");
    const item = document.createElement("div");
    item.className = "entry-row";
    
    // 수입이면 + 기호, 지출이면 - 기호 표시
    const sign = entry.isIncome ? '+' : '-';
    const amountClass = entry.isIncome ? 'income-amount' : 'expense-amount';
    
    item.innerHTML = `
      <div class="entry-category">${entry.category}</div>
      <div class="entry-desc">${entry.desc}</div>
      <div class="entry-method">${entry.method}</div>
      <div class="entry-amount ${amountClass}">${sign}${entry.amount.toLocaleString()}원</div>
    `;
    entryItems.appendChild(item);
  }

  addBtn.addEventListener("click", () => {
    const date = document.getElementById("date").value;
    const rawAmount = document.getElementById("amount").value.replace(/,/g, "");
    const amount = Number(rawAmount);
    const desc = document.getElementById("desc").value;

    if (!date || !amount || !desc) {
      alert("모든 항목을 정확히 입력해주세요!");
      return;
    }

    const entry = { 
      date, 
      amount, 
      desc, 
      method: selectedMethod, 
      category: selectedCategory,
      isIncome: isIncome // 수입/지출 여부 저장
    };
    entries.push(entry);
    addEntryToDOM(entry);
    updateTotalAmounts();

    document.getElementById("date").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("amount").placeholder = "0";
    selectedMethod = null;
    selectedCategory = null;
    display.textContent = "선택하세요";
    categoryDisplay.textContent = "선택하세요";
  });


  // 초기 더미 데이터 로드
  function loadDummyEntries() {
    dummyEntries.forEach(entry => {
      addEntryToDOM(entry);
      entries.push(entry);
    });
    updateTotalAmounts();
  }
  loadDummyEntries();

  renderCategoryOptions();
}