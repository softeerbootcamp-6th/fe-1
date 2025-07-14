import { formatDateText } from "../../utils/dateUtils.js";
import { formatAmount } from "../../utils/formatUtils.js";
import { getFilteredData } from "../../utils/dataUtils.js";
import { showModal } from "../../layouts/modal/modal.js";

// 결제 수단 저장소
let paymentMethods = ["현금", "신용카드"];

// 전역 변수들을 window 객체에 등록
export function setupGlobalVariables() {
  const elements = {
    contentInput: document.querySelector(".input-cell.content input"),
    charCountSpan: document.querySelector(".input-cell.content .char-count"),
    addBtn: document.querySelector(".input-cell.submit button"),
    dateInput: document.querySelector(".date-input"),
    amountInput: document.querySelector(".amount-input"),
    methodDropdown: document.querySelector(
      ".input-cell.method .custom-dropdown"
    ),
    categoryDropdown: document.querySelector(
      ".input-cell.category .custom-dropdown"
    ),
    historyList: document.querySelector(".history-list"),
    toggleBtns: document.querySelectorAll(".toggle-icon"),
  };

  // 전역 변수들
  const globals = {
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth(),
    currentToggleType: "minus",
    isEditMode: false,
    editingItemId: null,
  };

  // window 객체에 등록
  Object.assign(window, elements, globals);

  return { ...elements, ...globals };
}

// 전역 함수들을 window 객체에 등록
export function setupGlobalFunctions(
  accountBookStore,
  deleteItem,
  updateHeaderDate,
  updateInputDate,
  getFilteredData,
  onMonthChanged
) {
  const globalFunctions = {
    accountBookStore,
    deleteItem,
    updateHeaderDate,
    updateInputDate,
    getFilteredData,
    onMonthChanged,
    renderHistoryList,
    enterEditMode,
    cancelEditMode,
    getDropdownValue,
    setDropdownValue,
    updateFormValidation,
  };

  Object.assign(window, globalFunctions);
}

// Store 변경 감지 설정
export function setupStoreSubscription(accountBookStore) {
  accountBookStore.subscribe(() => {
    const currentData = accountBookStore.getTransactions();
    renderHistoryList(
      currentData,
      window.currentYear,
      window.currentMonth,
      window.historyList,
      window.enterEditMode,
      window.deleteItem
    );
  });
}

// 이벤트 리스너 설정
export function setupMainEventListeners(
  elements,
  updateAmountSign,
  setupAmountInputListeners,
  setupContentInputListeners,
  updateHeaderDate,
  validateFormData,
  processAmountSign,
  createNewItem,
  deleteItem
) {
  const {
    toggleBtns,
    dateInput,
    amountInput,
    contentInput,
    addBtn,
    methodDropdown,
    categoryDropdown,
    charCountSpan,
    historyList,
    currentYear,
    currentMonth,
    isEditMode,
    editingItemId,
  } = elements;

  // 이벤트 리스너들 설정
  setupToggleListeners(toggleBtns, updateAmountSign, amountInput);
  setupDateInputListeners(
    dateInput,
    currentYear,
    currentMonth,
    updateHeaderDate,
    renderHistoryList,
    window.accountBookStore.getTransactions(),
    historyList,
    enterEditMode,
    deleteItem
  );
  setupAmountInputListeners(amountInput, isEditMode, editingItemId);
  setupContentInputListeners(contentInput, charCountSpan);
  setupAddButtonListeners(
    addBtn,
    dateInput,
    amountInput,
    contentInput,
    methodDropdown,
    categoryDropdown,
    charCountSpan,
    validateFormData,
    processAmountSign,
    createNewItem,
    cancelEditMode
  );
  setupRealtimeValidation(
    dateInput,
    amountInput,
    contentInput,
    methodDropdown,
    categoryDropdown,
    addBtn
  );
  setupCustomDropdowns();
}

// 최초 렌더링 초기화
export function initializeRendering(
  accountBookStore,
  updateHeaderDate,
  updateInputDate
) {
  updateHeaderDate(window.currentYear, window.currentMonth);
  updateInputDate(window.currentYear, window.currentMonth, window.dateInput);
  renderHistoryList(
    accountBookStore.getTransactions(),
    window.currentYear,
    window.currentMonth,
    window.historyList,
    enterEditMode,
    window.deleteItem
  );
}

// 모달 초기화
export function initializeModal(initModal) {
  initModal();
}

// 제출 버튼 상태 업데이트
export function updateSubmitButtonState(addBtn, isValid) {
  const imgElement = addBtn.querySelector("img");
  if (imgElement) {
    imgElement.src = isValid
      ? "assets/icons/black-check.svg"
      : "assets/icons/unchecked.svg";
  }
}

// 드롭다운 관련 함수들
export function setupCustomDropdowns() {
  const dropdowns = document.querySelectorAll(".custom-dropdown");

  dropdowns.forEach((dropdown) => {
    const selected = dropdown.querySelector(".dropdown-selected");
    const options = dropdown.querySelector(".dropdown-options");
    const dropdownType = dropdown.dataset.type;

    selected.addEventListener("click", () => {
      const isActive = selected.classList.contains("active");
      closeAllDropdowns();

      if (!isActive) {
        selected.classList.add("active");
        options.classList.add("show");
        if (dropdownType === "method") updatePaymentMethodOptions(dropdown);
      }
    });

    options.addEventListener("click", (e) => {
      const option = e.target.closest(".dropdown-option");
      const deleteBtn = e.target.closest(".delete-btn");

      if (!option) return;

      if (deleteBtn) {
        e.stopPropagation();
        handleDeletePaymentMethod(deleteBtn);
      } else if (option.classList.contains("add-option")) {
        handleAddPaymentMethod(dropdown);
      } else {
        selectDropdownOption(dropdown, option);
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".custom-dropdown")) closeAllDropdowns();
  });
}

// 모든 드롭다운 닫기
export function closeAllDropdowns() {
  document
    .querySelectorAll(".dropdown-selected")
    .forEach((selected) => selected.classList.remove("active"));
  document
    .querySelectorAll(".dropdown-options")
    .forEach((options) => options.classList.remove("show"));
}

// 드롭다운 옵션 선택
export function selectDropdownOption(dropdown, option) {
  const selected = dropdown.querySelector(".dropdown-selected .selected-text");
  const value = option.dataset.value;

  dropdown
    .querySelectorAll(".dropdown-option")
    .forEach((opt) => opt.classList.remove("selected"));
  option.classList.add("selected");

  const optionText = option.querySelector("span")
    ? option.querySelector("span").textContent
    : option.textContent;
  selected.textContent = optionText;

  closeAllDropdowns();
  updateFormValidation();
}

// 결제 수단 옵션 업데이트
export function updatePaymentMethodOptions(dropdown) {
  const options = dropdown.querySelector(".dropdown-options");
  const currentValue = dropdown.querySelector(".selected-text").textContent;

  options.innerHTML = `
    <div class="dropdown-option" data-value=""><span>선택하세요</span></div>
    ${paymentMethods
      .map(
        (method) => `
      <div class="dropdown-option" data-value="${method}">
        <span>${method}</span>
        <div class="edit-actions">
          <button class="delete-btn">
            <img src="assets/icons/red-closed.svg" alt="delete" class="delete-icon" />
          </button>
        </div>
      </div>
    `
      )
      .join("")}
    <div class="dropdown-option add-option">
      <img src="assets/icons/plus.svg" alt="add" class="add-icon" />
      <span>추가하기</span>
    </div>
  `;

  if (currentValue && currentValue !== "선택하세요") {
    const selectedOption = options.querySelector(
      `[data-value="${currentValue}"]`
    );
    if (selectedOption) selectedOption.classList.add("selected");
  }
}

// 결제 수단 추가
export function handleAddPaymentMethod(dropdown) {
  showModal("새로운 결제 수단 추가", "결제 수단을 입력하세요", (inputValue) => {
    if (inputValue && inputValue.trim()) {
      const trimmedName = inputValue.trim();
      if (!paymentMethods.includes(trimmedName)) {
        paymentMethods.push(trimmedName);
        updatePaymentMethodOptions(dropdown);
      } else {
        alert("이미 존재하는 결제 수단입니다.");
      }
    }
  });
}

// 결제 수단 삭제
export function handleDeletePaymentMethod(deleteBtn) {
  const option = deleteBtn.closest(".dropdown-option");
  const value = option.dataset.value;

  if (confirm(`'${value}' 결제 수단을 삭제하시겠습니까?`)) {
    const index = paymentMethods.indexOf(value);
    if (index !== -1) {
      paymentMethods.splice(index, 1);
      const dropdown = deleteBtn.closest(".custom-dropdown");
      const selectedText = dropdown.querySelector(".selected-text");
      if (selectedText.textContent === value)
        selectedText.textContent = "선택하세요";
      updatePaymentMethodOptions(dropdown);
      updateFormValidation();
    }
  }
}

// 폼 유효성 검사 업데이트
export function updateFormValidation() {
  const addBtn = document.querySelector(".input-cell.submit button");
  const dateInput = document.querySelector(".date-input");
  const amountInput = document.querySelector(".amount-input");
  const contentInput = document.querySelector(".input-cell.content input");
  const methodText = document.querySelector(
    ".input-cell.method .selected-text"
  ).textContent;
  const categoryText = document.querySelector(
    ".input-cell.category .selected-text"
  ).textContent;

  const isValid =
    dateInput.value &&
    amountInput.value &&
    contentInput.value.trim() &&
    methodText !== "선택하세요" &&
    categoryText !== "선택하세요";
  updateSubmitButtonState(addBtn, isValid);
}

// 드롭다운 값 가져오기
export function getDropdownValue(dropdown) {
  const selectedText = dropdown.querySelector(".selected-text").textContent;
  return selectedText === "선택하세요" ? "" : selectedText;
}

// 드롭다운 값 설정
export function setDropdownValue(dropdown, value) {
  const selectedText = dropdown.querySelector(".selected-text");
  const options = dropdown.querySelectorAll(".dropdown-option");

  options.forEach((option) => option.classList.remove("selected"));

  if (value) {
    selectedText.textContent = value;
    const targetOption = dropdown.querySelector(`[data-value="${value}"]`);
    if (targetOption) targetOption.classList.add("selected");
  } else {
    selectedText.textContent = "선택하세요";
  }
}

// 결제 수단 배열 접근자
export function getPaymentMethods() {
  return paymentMethods;
}

// 결제 수단 배열 접근자
export function setPaymentMethods(methods) {
  paymentMethods = methods;
}

// 실시간 유효성 검사 함수
export function validateFormRealtime(
  dateInput,
  amountInput,
  contentInput,
  methodDropdown,
  categoryDropdown
) {
  const date = dateInput.value;
  const amount = amountInput.value.replace(/,/g, "");
  const content = contentInput.value.trim();
  const method = window.getDropdownValue(methodDropdown);
  const category = window.getDropdownValue(categoryDropdown);
  return date && amount && content && method && category;
}

// 실시간 유효성 검사 이벤트 리스너 설정
export function setupRealtimeValidation(
  dateInput,
  amountInput,
  contentInput,
  methodDropdown,
  categoryDropdown,
  addBtn
) {
  const checkAndUpdateButton = () => {
    const isValid = validateFormRealtime(
      dateInput,
      amountInput,
      contentInput,
      methodDropdown,
      categoryDropdown
    );
    updateSubmitButtonState(addBtn, isValid);
  };

  updateSubmitButtonState(
    addBtn,
    validateFormRealtime(
      dateInput,
      amountInput,
      contentInput,
      methodDropdown,
      categoryDropdown
    )
  );

  [dateInput, amountInput, contentInput].forEach((input) => {
    input.addEventListener("input", checkAndUpdateButton);
    input.addEventListener("change", checkAndUpdateButton);
  });
}

// 토글 버튼 이벤트 리스너
export function setupToggleListeners(
  toggleBtns,
  updateAmountSign,
  amountInput
) {
  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const type = this.getAttribute("data-type");
      const activeBtn = document.querySelector(".toggle-icon.active");

      if (activeBtn === this) {
        const newType = type === "minus" ? "plus" : "minus";
        const newBtn = document.querySelector(`[data-type="${newType}"]`);
        this.classList.remove("active");
        newBtn.classList.add("active");
        window.currentToggleType = newType;
      } else {
        toggleBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        window.currentToggleType = type;
      }

      updateAmountSign(window.currentToggleType, amountInput);
    });
  });
}

// 날짜 입력 이벤트 리스너
export function setupDateInputListeners(
  dateInput,
  currentYear,
  currentMonth,
  updateHeaderDate,
  renderHistoryList,
  dummyData,
  historyList,
  enterEditMode,
  deleteItem
) {
  dateInput.addEventListener("change", function () {
    const selectedDate = new Date(this.value);
    const newYear = selectedDate.getFullYear();
    const newMonth = selectedDate.getMonth();

    if (newYear !== currentYear || newMonth !== currentMonth) {
      window.currentYear = newYear;
      window.currentMonth = newMonth;
      updateHeaderDate(newYear, newMonth);
      renderHistoryList(
        dummyData,
        newYear,
        newMonth,
        historyList,
        enterEditMode,
        deleteItem
      );
    }
  });
}

// 추가 버튼 클릭 이벤트 리스너
export function setupAddButtonListeners(
  addBtn,
  dateInput,
  amountInput,
  contentInput,
  methodDropdown,
  categoryDropdown,
  charCountSpan,
  validateFormData,
  processAmountSign,
  createNewItem,
  cancelEditMode
) {
  addBtn.addEventListener("click", function () {
    const date = dateInput.value;
    let amount = amountInput.value.replace(/,/g, "");
    const content = contentInput.value.trim();
    const method = window.getDropdownValue(methodDropdown);
    const category = window.getDropdownValue(categoryDropdown);

    if (!validateFormData(date, amount, content, method, category)) return;

    const amountNum = processAmountSign(amount, window.currentToggleType);

    if (window.isEditMode) {
      window.accountBookStore.updateTransaction(window.editingItemId, {
        date,
        amount: amountNum,
        content,
        method,
        category,
      });
      if (typeof cancelEditMode === "function") cancelEditMode();
    } else {
      createNewItem(date, amountNum, content, method, category);
    }

    // 입력 폼 초기화
    amountInput.value = "";
    contentInput.value = "";
    window.setDropdownValue(methodDropdown, "");
    window.setDropdownValue(categoryDropdown, "");
    charCountSpan.textContent = "0/32";
    window.updateInputDate(window.currentYear, window.currentMonth, dateInput);

    // 토글 상태 초기화
    window.currentToggleType = "minus";
    window.toggleBtns.forEach((btn) => btn.classList.remove("active"));
    const minusToggle = document.querySelector('[data-type="minus"]');
    if (minusToggle) minusToggle.classList.add("active");

    amountInput.classList.remove("plus", "minus");
    amountInput.classList.add("minus");

    window.updateFormValidation();
  });
}

// 수정 모드 진입 함수
export function enterEditMode(itemId) {
  window.isEditMode = true;
  window.editingItemId = itemId;

  const item = window.accountBookStore.getTransactionById(itemId);
  window.dateInput.value = item.date;

  const amountValue = Math.abs(item.amount).toLocaleString();
  window.amountInput.type = "text";
  window.amountInput.value = amountValue;

  window.contentInput.value = item.content;
  window.setDropdownValue(window.methodDropdown, item.method);
  window.setDropdownValue(window.categoryDropdown, item.category);

  const isIncome = item.amount > 0;
  window.currentToggleType = isIncome ? "plus" : "minus";

  window.toggleBtns.forEach((btn) => btn.classList.remove("active"));
  const activeToggle = document.querySelector(
    `[data-type="${window.currentToggleType}"]`
  );
  if (activeToggle) activeToggle.classList.add("active");

  window.charCountSpan.textContent = `${window.contentInput.value.length}/32`;

  setTimeout(() => {
    if (typeof window.updateFormValidation === "function")
      window.updateFormValidation();
  }, 10);
}

// 수정 모드 취소 함수
export function cancelEditMode() {
  window.isEditMode = false;
  window.editingItemId = null;

  window.amountInput.value = "";
  window.contentInput.value = "";
  window.setDropdownValue(window.methodDropdown, "");
  window.setDropdownValue(window.categoryDropdown, "");
  window.charCountSpan.textContent = "0/32";

  window.currentToggleType = "minus";
  window.toggleBtns.forEach((btn) => btn.classList.remove("active"));
  const minusToggle = document.querySelector('[data-type="minus"]');
  if (minusToggle) minusToggle.classList.add("active");

  updateSubmitButtonState(window.addBtn, false);

  document
    .querySelectorAll(".history-item")
    .forEach((item) => item.classList.remove("edit-mode"));
}

// 렌더링 함수
export function renderHistoryList(
  dummyData,
  currentYear,
  currentMonth,
  historyList,
  enterEditMode,
  deleteItem
) {
  const filteredData = getFilteredData(dummyData, currentYear, currentMonth);
  const grouped = {};

  filteredData.forEach((item) => {
    if (!grouped[item.date]) grouped[item.date] = [];
    grouped[item.date].push(item);
  });

  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  let totalIncome = 0,
    totalExpense = 0;
  let totalCount = filteredData.length;

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
          <div class="history-actions" style="display: none;" onclick="deleteItem(${
            item.id
          })">
            <img src="assets/icons/delete.svg" alt="삭제 아이콘"/>
            <p class="delete-btn" style=" color: #ff4444; cursor: pointer; font-size: 12px;">삭제</p>
          </div>
        </div>
      `;
    });

    let dayTotalText = "";
    if (dayIncome && dayExpense)
      dayTotalText = `수입 ${formatAmount(dayIncome)}원 지출 ${formatAmount(
        dayExpense
      )}원`;
    else if (dayIncome) dayTotalText = `수입 ${formatAmount(dayIncome)}원`;
    else if (dayExpense) dayTotalText = `지출 ${formatAmount(dayExpense)}원`;

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

  historyList.innerHTML = html;

  const summaryB = document.querySelectorAll(".summary-row b");
  if (summaryB.length >= 3) {
    summaryB[0].textContent = `${totalCount}건`;
    summaryB[1].textContent = formatAmount(totalIncome);
    summaryB[2].textContent = formatAmount(totalExpense);
  }

  const items = historyList.querySelectorAll(".history-item");
  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) return;

      const itemId = parseInt(item.getAttribute("data-id"), 10);

      if (item.classList.contains("edit-mode")) {
        items.forEach((i) => i.classList.remove("edit-mode"));
        items.forEach(
          (i) => (i.querySelector(".history-actions").style.display = "none")
        );
        if (typeof window.cancelEditMode === "function")
          window.cancelEditMode();
        return;
      }

      if (typeof enterEditMode === "function") enterEditMode(itemId);

      items.forEach((i) => i.classList.remove("edit-mode"));
      item.classList.add("edit-mode");

      items.forEach(
        (i) => (i.querySelector(".history-actions").style.display = "none")
      );
      item.querySelector(".history-actions").style.display = "flex";
    });
  });

  items.forEach((item) => {
    const deleteBtn = item.querySelector(".delete-btn");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const itemId = parseInt(item.getAttribute("data-id"), 10);
        if (typeof deleteItem === "function") deleteItem(itemId);
      });
    }
  });
}
