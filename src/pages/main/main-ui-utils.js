import { formatDateText } from "../../utils/date-utils.js";
import {
  formatAmount,
  formatAmountInput,
  updateAmountSign,
} from "../../utils/format-utils.js";
import {
  getFilteredData,
  createNewItem,
  updateTransactionItem,
  processAmountSign,
} from "../../utils/data-utils.js";
import { showModal } from "../../layouts/modal/modal.js";
import { getTransactions, getTransactionById } from "../../api/transaction.js";
import { getPaymentMethods as getPaymentMethodsApi } from "../../api/payment-method.js";

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

  // 전역 변수들 (currentYear, currentMonth만 유지)
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
  deleteItem,
  updateHeaderDate,
  updateInputDate,
  getFilteredData,
  onMonthChanged
) {
  const globalFunctions = {
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
    formatAmountInput,
  };

  Object.assign(window, globalFunctions);
}

// 각각의 이벤트 리스너 설정 함수들
// 토글 버튼 이벤트 리스너 설정
export function setupToggleListeners() {
  const toggleBtns = document.querySelectorAll(".toggle-icon");

  if (toggleBtns.length !== 2) return; // plus, minus 두 개만 있어야 함

  // 기존 이벤트 리스너 제거
  toggleBtns.forEach((btn) => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
  });

  // data-type을 이용해서 정확히 가져오기
  const minusBtn = document.querySelector('.toggle-icon[data-type="minus"]');
  const plusBtn = document.querySelector('.toggle-icon[data-type="plus"]');

  if (!minusBtn || !plusBtn) return;

  console.log("토글 버튼 찾기:", { minusBtn, plusBtn });

  // plusBtn만 클릭 이벤트 리스너 등록
  plusBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    // 현재 상태 확인
    const isMinusActive = minusBtn.classList.contains("active");

    if (isMinusActive) {
      // minus가 active면 plus로 변경
      minusBtn.classList.remove("active");
      plusBtn.classList.add("active");
      window.currentToggleType = "plus";
    } else {
      // plus가 active면 minus로 변경
      plusBtn.classList.remove("active");
      minusBtn.classList.add("active");
      window.currentToggleType = "minus";
    }

    // 입력 필드 클래스도 업데이트
    const amountInput = document.querySelector(".amount-input");
    if (amountInput) {
      amountInput.classList.remove("plus", "minus");
      amountInput.classList.add(window.currentToggleType);

      // 입력 필드에 값이 있으면 부호 적용
      if (amountInput.value && amountInput.value !== "") {
        updateAmountSign(window.currentToggleType, amountInput);
      }
    }

    updateFormValidation();
  });

  console.log("토글 버튼 이벤트 리스너 등록 완료");
}

// 날짜 입력 필드 이벤트 리스너 설정
export function setupDateInputListeners() {
  const dateInput = document.querySelector(".date-input");
  if (!dateInput) return;

  // 기존 이벤트 리스너 제거
  dateInput.replaceWith(dateInput.cloneNode(true));
  const newDateInput = document.querySelector(".date-input");

  newDateInput.addEventListener("change", function () {
    updateFormValidation();
  });
}

// 금액 입력 필드 이벤트 리스너 설정
export function setupAmountInputListeners() {
  const amountInput = document.querySelector(".amount-input");
  if (!amountInput) return;

  // 기존 이벤트 리스너 제거
  amountInput.replaceWith(amountInput.cloneNode(true));
  const newAmountInput = document.querySelector(".amount-input");

  newAmountInput.addEventListener("input", function (e) {
    if (window.formatAmountInput) {
      window.formatAmountInput(e);
    }
    if (window.updateFormValidation) {
      window.updateFormValidation();
    }
  });
}

// 내용 입력 필드 이벤트 리스너 설정
export function setupContentInputListeners() {
  const contentInput = document.querySelector(".input-cell.content input");
  const charCountSpan = document.querySelector(
    ".input-cell.content .char-count"
  );
  if (!contentInput || !charCountSpan) return;

  // 기존 이벤트 리스너 제거
  contentInput.replaceWith(contentInput.cloneNode(true));
  const newContentInput = document.querySelector(".input-cell.content input");

  newContentInput.addEventListener("input", function () {
    const maxLength = 32;
    const currentLength = this.value.length;
    charCountSpan.textContent = `${currentLength}/${maxLength}`;

    if (window.updateFormValidation) {
      window.updateFormValidation();
    }
  });
}

// 제출 버튼 이벤트 리스너 설정
export function setupAddButtonListeners() {
  const addBtn = document.querySelector(".input-cell.submit button");

  if (!addBtn) return;
  console.log("addBtn 이벤트 리스너 등록", addBtn);

  // 기존 이벤트 리스너 제거 (중복 방지)
  const newAddBtn = addBtn.cloneNode(true);
  addBtn.parentNode.replaceChild(newAddBtn, addBtn);

  newAddBtn.addEventListener("click", async function () {
    console.log("addBtn 클릭");
    const dateInput = document.querySelector(".date-input");
    const amountInput = document.querySelector(".amount-input");
    const contentInput = document.querySelector(".input-cell.content input");
    const methodDropdown = document.querySelector(
      ".input-cell.method .custom-dropdown"
    );
    const categoryDropdown = document.querySelector(
      ".input-cell.category .custom-dropdown"
    );
    const charCountSpan = document.querySelector(
      ".input-cell.content .char-count"
    );

    if (
      !dateInput ||
      !amountInput ||
      !contentInput ||
      !methodDropdown ||
      !categoryDropdown ||
      !charCountSpan
    ) {
      console.warn("Some form elements not found");
      return;
    }

    const date = dateInput.value;
    let amount = amountInput.value.replace(/,/g, "");
    const content = contentInput.value.trim();
    const method = getDropdownValue(methodDropdown);
    const category = getDropdownValue(categoryDropdown);
    const amountNum = processAmountSign(amount, window.currentToggleType);

    // 데이터 검증 추가
    if (!date || !amount || !content || !method || !category) {
      alert("모든 항목을 올바르게 입력해 주세요.");
      return;
    }

    if (isNaN(amountNum)) {
      alert("올바른 금액을 입력해 주세요.");
      return;
    }

    if (window.isEditMode) {
      // 수정 모드 - transaction.js API 사용
      try {
        await updateTransactionItem(window.editingItemId, {
          date,
          amount: amountNum,
          content,
          method,
          category,
        });
        console.log("거래 내역 수정 완료");
      } catch (error) {
        console.error("거래 내역 수정 실패:", error);
        return;
      }
      cancelEditMode();
    } else {
      // 새 항목 추가 - transaction.js API 사용
      try {
        console.log("거래 내역 추가 시도");
        await createNewItem(date, amountNum, content, method, category);
        console.log("거래 내역 추가 완료");
      } catch (error) {
        console.error("거래 내역 추가 실패:", error);
        return;
      }
    }

    // 입력 폼 초기화
    amountInput.value = "";
    contentInput.value = "";
    setDropdownValue(methodDropdown, "");
    setDropdownValue(categoryDropdown, "");
    charCountSpan.textContent = "0/32";
    if (window.updateInputDate) {
      window.updateInputDate(
        window.currentYear,
        window.currentMonth,
        dateInput
      );
    }

    // 토글 상태 초기화 - toggle-btn 기준으로 수정
    window.currentToggleType = "minus";
    const toggleBtnContainer = document.querySelector(".toggle-btn");
    if (toggleBtnContainer) {
      const toggleBtns = toggleBtnContainer.querySelectorAll(".toggle-icon");
      toggleBtns.forEach((btn) => {
        btn.classList.remove("active");
        if (btn.dataset.type === "minus") {
          btn.classList.add("active");
        }
      });
    }

    // 입력 필드 클래스도 초기화
    amountInput.classList.remove("plus", "minus");
    amountInput.classList.add("minus");

    updateFormValidation();
  });
}

// 최초 렌더링 초기화
export function initializeRendering(updateHeaderDate, updateInputDate) {
  updateHeaderDate(window.currentYear, window.currentMonth);
  updateInputDate(window.currentYear, window.currentMonth, window.dateInput);
  updateHistoryList();
}

// 모달 초기화
export function initializeModal(initModal) {
  initModal();
}

// 히스토리 리스트 업데이트 함수
export async function updateHistoryList() {
  try {
    const transactions = await getTransactions();
    renderHistoryList(
      transactions,
      window.currentYear,
      window.currentMonth,
      window.historyList,
      window.enterEditMode,
      window.deleteItem
    );
  } catch (error) {
    console.error("히스토리 리스트 업데이트 실패:", error);
  }
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

    selected.addEventListener(
      "click",
      (e) => {
        e.preventDefault(); // 기본 동작 방지
        e.stopPropagation(); // 이벤트 버블링 방지
        e.stopImmediatePropagation(); // 즉시 전파 중단

        const isActive = selected.classList.contains("active");
        console.log("isActive", isActive);

        // 다른 드롭다운들만 닫기
        dropdowns.forEach((otherDropdown) => {
          if (otherDropdown !== dropdown) {
            const otherSelected =
              otherDropdown.querySelector(".dropdown-selected");
            const otherOptions =
              otherDropdown.querySelector(".dropdown-options");
            otherSelected.classList.remove("active");
            otherOptions.classList.remove("show");
          }
        });

        // 현재 드롭다운 토글
        if (!isActive) {
          selected.classList.add("active");
          options.classList.add("show");
          if (dropdownType === "method") updatePaymentMethodOptions(dropdown);
        } else {
          selected.classList.remove("active");
          options.classList.remove("show");
        }
      },
      { once: false, passive: false }
    ); // 이벤트 옵션 명시

    options.addEventListener("click", (e) => {
      e.stopPropagation(); // 옵션 클릭 시 버블링 방지

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

  // 문서 클릭 시 드롭다운 닫기 (이벤트 위임 사용)
  document.addEventListener(
    "click",
    (e) => {
      if (!e.target.closest(".custom-dropdown")) {
        closeAllDropdowns();
      }
    },
    { passive: true }
  );
}

// 모든 드롭다운 닫기 (특정 드롭다운 제외)
export function closeAllDropdowns(excludeDropdown = null) {
  document.querySelectorAll(".dropdown-selected").forEach((selected) => {
    if (
      excludeDropdown &&
      selected.closest(".custom-dropdown") === excludeDropdown
    ) {
      return; // 제외할 드롭다운은 건너뛰기
    }
    selected.classList.remove("active");
  });
  document.querySelectorAll(".dropdown-options").forEach((options) => {
    if (
      excludeDropdown &&
      options.closest(".custom-dropdown") === excludeDropdown
    ) {
      return; // 제외할 드롭다운은 건너뛰기
    }
    options.classList.remove("show");
  });
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
export async function getPaymentMethods() {
  const paymentMethods = await getPaymentMethodsApi();
  return paymentMethods;
}

// 결제 수단 배열 접근자
export function setPaymentMethods(methods) {
  paymentMethods = methods;
}

// 실시간 유효성 검사 함수
export function validateFormRealtime() {
  const dateInput = document.querySelector(".date-input");
  const amountInput = document.querySelector(".amount-input");
  const contentInput = document.querySelector(".input-cell.content input");
  const methodDropdown = document.querySelector(
    ".input-cell.method .custom-dropdown"
  );
  const categoryDropdown = document.querySelector(
    ".input-cell.category .custom-dropdown"
  );

  const date = dateInput.value;
  const amount = amountInput.value.replace(/,/g, "");
  const content = contentInput.value.trim();
  const method = getDropdownValue(methodDropdown);
  const category = getDropdownValue(categoryDropdown);
  return date && amount && content && method && category;
}

// 실시간 유효성 검사 이벤트 리스너 설정
export function setupRealtimeValidation() {
  const addBtn = document.querySelector(".input-cell.submit button");
  const dateInput = document.querySelector(".date-input");
  const amountInput = document.querySelector(".amount-input");
  const contentInput = document.querySelector(".input-cell.content input");

  if (!addBtn || !dateInput || !amountInput || !contentInput) {
    console.warn("Form elements for validation not found");
    return;
  }

  const checkAndUpdateButton = () => {
    const isValid = validateFormRealtime();
    updateSubmitButtonState(addBtn, isValid);
  };

  updateSubmitButtonState(addBtn, validateFormRealtime());

  [dateInput, amountInput, contentInput].forEach((input) => {
    input.addEventListener("input", checkAndUpdateButton);
    input.addEventListener("change", checkAndUpdateButton);
  });
}

// 수정 모드 진입 함수
export function enterEditMode(itemId) {
  window.isEditMode = true;
  window.editingItemId = itemId; // 문자열 ID 그대로 사용

  getTransactionById(itemId)
    .then((item) => {
      const amountInput = document.querySelector(".amount-input");
      const contentInput = document.querySelector(".input-cell.content input");
      const methodDropdown = document.querySelector(
        ".input-cell.method .custom-dropdown"
      );
      const categoryDropdown = document.querySelector(
        ".input-cell.category .custom-dropdown"
      );
      const dateInput = document.querySelector(".date-input");
      const charCountSpan = document.querySelector(
        ".input-cell.content .char-count"
      );

      dateInput.value = item.date;

      const amountValue = Math.abs(item.amount).toLocaleString();
      amountInput.type = "text";
      amountInput.value = amountValue;

      contentInput.value = item.content;
      setDropdownValue(methodDropdown, item.method);
      setDropdownValue(categoryDropdown, item.category);

      const isIncome = item.amount > 0;
      window.currentToggleType = isIncome ? "plus" : "minus";

      const toggleBtns = document.querySelectorAll(".toggle-icon");
      toggleBtns.forEach((btn) => btn.classList.remove("active"));
      const activeToggle = document.querySelector(
        `[data-type="${window.currentToggleType}"]`
      );
      if (activeToggle) activeToggle.classList.add("active");

      charCountSpan.textContent = `${contentInput.value.length}/32`;

      setTimeout(() => {
        updateFormValidation();
      }, 10);
    })
    .catch((error) => {
      console.error("거래 내역 조회 실패:", error);
    });
}

// 수정 모드 취소 함수
export function cancelEditMode() {
  window.isEditMode = false;
  window.editingItemId = null;

  const amountInput = document.querySelector(".amount-input");
  const contentInput = document.querySelector(".input-cell.content input");
  const methodDropdown = document.querySelector(
    ".input-cell.method .custom-dropdown"
  );
  const categoryDropdown = document.querySelector(
    ".input-cell.category .custom-dropdown"
  );
  const charCountSpan = document.querySelector(
    ".input-cell.content .char-count"
  );
  const addBtn = document.querySelector(".input-cell.submit button");

  amountInput.value = "";
  contentInput.value = "";
  setDropdownValue(methodDropdown, "");
  setDropdownValue(categoryDropdown, "");
  charCountSpan.textContent = "0/32";

  window.currentToggleType = "minus";
  const toggleBtns = document.querySelectorAll(".toggle-icon");
  toggleBtns.forEach((btn) => btn.classList.remove("active"));
  const minusToggle = document.querySelector('[data-type="minus"]');
  if (minusToggle) minusToggle.classList.add("active");

  updateSubmitButtonState(addBtn, false);

  document
    .querySelectorAll(".history-item")
    .forEach((item) => item.classList.remove("edit-mode"));
}

// 렌더링 함수 수정
export async function renderHistoryList(
  transactions,
  currentYear,
  currentMonth,
  historyList,
  enterEditMode,
  deleteItem
) {
  const filteredData = getFilteredData(transactions, currentYear, currentMonth);
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
          <div class="history-actions" style="display: none;">
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

      // ID를 문자열로 처리 (parseInt 제거)
      const itemId = item.getAttribute("data-id");

      if (item.classList.contains("edit-mode")) {
        items.forEach((i) => i.classList.remove("edit-mode"));
        items.forEach(
          (i) => (i.querySelector(".history-actions").style.display = "none")
        );
        cancelEditMode();
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
        // ID를 문자열로 처리 (parseInt 제거)
        const itemId = item.getAttribute("data-id");
        if (typeof deleteItem === "function") deleteItem(itemId);
      });
    }
  });
}
