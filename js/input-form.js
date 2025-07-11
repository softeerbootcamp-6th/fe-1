//js/input-form.js
import { updateTotalAmounts } from "./totalAmount.js";
import { dummyEntries } from "./dummy.js";

export function initInputForm() {
  let selectedMethod = null;
  let selectedCategory = null;
  let isIncome = true;

  const toggleSign = document.getElementById("toggle-sign");
  const addBtn = document.getElementById("add-btn");

  const amountInput = document.getElementById("amount");
  const descInput = document.getElementById("desc");
  const charCount = document.getElementById("char-count");

  const display = document.getElementById("dropdown-display");
  const panel = document.getElementById("dropdown-panel");
  const dropAddBtn = document.getElementById("dropdown-add");

  const modal = document.getElementById("modal");
  const confirmAdd = document.getElementById("confirm-add");
  const cancelAdd = document.getElementById("cancel-add");
  const newMethodInput = document.getElementById("new-method");

  const categoryWrapper = document.getElementById("category-wrapper");
  const categoryDisplay = document.getElementById("category-display");
  const categoryPanel = document.getElementById("category-panel");

  const incomeCategories = ["월급", "용돈", "기타수입"];
  const expenseCategories = ["생활", "식비", "교통", "쇼핑/뷰티", "의료/건강", "문화/여가", "미분류"];

  const entries = [];

  function renderCategoryOptions() {
    // 수입/지출에 따라 카테고리 옵션을 업데이트
    updateTotalAmounts();
    categoryPanel.innerHTML = "";
    const list = isIncome ? incomeCategories : expenseCategories;

    list.forEach(item => {
      const div = document.createElement("div");
      div.className = "dropdown-option";
      div.textContent = item;
      div.dataset.value = item;
      categoryPanel.appendChild(div);
    });
  }

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

  toggleSign.addEventListener("click", () => {
    isIncome = !isIncome;
    toggleSign.textContent = isIncome ? "+" : "-";
    toggleSign.classList.toggle("minus", !isIncome);
    categoryDisplay.textContent = "선택하세요";
    selectedCategory = null;
    renderCategoryOptions();
  });

  amountInput.addEventListener("input", () => {
    const rawValue = amountInput.value.replace(/[^\d]/g, "");
    amountInput.value = rawValue ? Number(rawValue).toLocaleString() : "";
  });

  descInput.addEventListener("input", () => {
    const length = descInput.value.length;
    charCount.textContent = `${length} / 32`;
  });

  display.addEventListener("click", () => {
    panel.classList.toggle("hidden");
  });

  dropAddBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    newMethodInput.value = "";
    panel.classList.add("hidden");
  });

  cancelAdd.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  confirmAdd.addEventListener("click", () => {
    const newMethod = newMethodInput.value.trim();
    if (!newMethod) {
      alert("결제수단을 입력해주세요.");
      return;
    }

    const option = document.createElement("div");
    option.className = "dropdown-option";
    option.dataset.value = newMethod;
    option.innerHTML = `<span>${newMethod}</span><button class="delete-btn">❌</button>`;
    panel.insertBefore(option, dropAddBtn);

    display.textContent = newMethod;
    selectedMethod = newMethod;
    modal.classList.add("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!document.getElementById("method-wrapper").contains(e.target)) {
      panel.classList.add("hidden");
    }
    if (!categoryWrapper.contains(e.target)) {
      categoryPanel.classList.add("hidden");
    }
  });

  panel.addEventListener("click", (e) => {
    const optionDiv = e.target.closest(".dropdown-option");
    if (!optionDiv) return;

    const methodName = optionDiv.dataset.value;

    if (e.target.classList.contains("delete-btn")) {
      optionDiv.remove();
      if (selectedMethod === methodName) {
        display.textContent = "선택하세요";
        selectedMethod = null;
      }
    } else {
      display.textContent = methodName;
      selectedMethod = methodName;
      panel.classList.add("hidden");
    }
  });

  categoryDisplay.addEventListener("click", () => {
    categoryPanel.classList.toggle("hidden");
  });

  categoryPanel.addEventListener("click", (e) => {
    if (e.target.classList.contains("dropdown-option")) {
      selectedCategory = e.target.dataset.value;
      categoryDisplay.textContent = selectedCategory;
      categoryPanel.classList.add("hidden");
    }
  });

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