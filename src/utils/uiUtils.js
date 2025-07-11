import { formatDateText } from "./dateUtils.js";
import { formatAmount } from "./formatUtils.js";
import { getFilteredData } from "./dataUtils.js";
import { showModal } from "../layouts/modal/modal.js";

// 결제 수단 저장소
let paymentMethods = ["현금", "신용카드"];

// 제출 버튼 상태 업데이트 함수 (SVG 교체 방식)
export function updateSubmitButtonState(addBtn, isValid) {
  const imgElement = addBtn.querySelector("img");
  if (imgElement) {
    if (isValid) {
      // 유효할 때: black-check.svg 사용
      imgElement.src = "assets/icons/black-check.svg";
    } else {
      // 유효하지 않을 때: unchecked.svg 사용 (회색 버전)
      imgElement.src = "assets/icons/unchecked.svg";
    }
  }
}

// 드롭다운 관련 함수들

// 커스텀 드롭다운 이벤트 설정
export function setupCustomDropdowns() {
  const dropdowns = document.querySelectorAll(".custom-dropdown");

  dropdowns.forEach((dropdown) => {
    const selected = dropdown.querySelector(".dropdown-selected");
    const options = dropdown.querySelector(".dropdown-options");
    const dropdownType = dropdown.dataset.type;

    // 드롭다운 클릭 이벤트
    selected.addEventListener("click", () => {
      const isActive = selected.classList.contains("active");

      // 모든 드롭다운 닫기
      closeAllDropdowns();

      if (!isActive) {
        selected.classList.add("active");
        options.classList.add("show");

        // 결제 수단 드롭다운인 경우 동적 옵션 업데이트
        if (dropdownType === "method") {
          updatePaymentMethodOptions(dropdown);
        }
      }
    });

    // 옵션 선택 이벤트
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

  // 외부 클릭 시 드롭다운 닫기
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".custom-dropdown")) {
      closeAllDropdowns();
    }
  });
}

// 모든 드롭다운 닫기
export function closeAllDropdowns() {
  const allSelected = document.querySelectorAll(".dropdown-selected");
  const allOptions = document.querySelectorAll(".dropdown-options");

  allSelected.forEach((selected) => selected.classList.remove("active"));
  allOptions.forEach((options) => options.classList.remove("show"));
}

// 드롭다운 옵션 선택
export function selectDropdownOption(dropdown, option) {
  const selected = dropdown.querySelector(".dropdown-selected .selected-text");
  const value = option.dataset.value;

  // 이전 선택된 옵션 초기화
  dropdown.querySelectorAll(".dropdown-option").forEach((opt) => {
    opt.classList.remove("selected");
  });

  // 새 옵션 선택
  option.classList.add("selected");

  const optionText = option.querySelector("span")
    ? option.querySelector("span").textContent
    : option.textContent;
  selected.textContent = optionText;

  // 드롭다운 닫기
  closeAllDropdowns();

  // 유효성 검사 업데이트
  updateFormValidation();
}

// 결제 수단 옵션 업데이트
export function updatePaymentMethodOptions(dropdown) {
  const options = dropdown.querySelector(".dropdown-options");
  const currentValue = dropdown.querySelector(".selected-text").textContent;

  // 기본 옵션들 제거하고 새로 생성
  options.innerHTML = `
    <div class="dropdown-option" data-value="">
      <span>선택하세요</span>
    </div>
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

  // 현재 선택된 값 유지
  if (currentValue && currentValue !== "선택하세요") {
    const selectedOption = options.querySelector(
      `[data-value="${currentValue}"]`
    );
    if (selectedOption) {
      selectedOption.classList.add("selected");
    }
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

      // 현재 선택된 값이 삭제된 값인 경우 초기화
      const dropdown = deleteBtn.closest(".custom-dropdown");
      const selectedText = dropdown.querySelector(".selected-text");
      if (selectedText.textContent === value) {
        selectedText.textContent = "선택하세요";
      }

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

  // 기존 updateSubmitButtonState 함수를 사용하도록 수정
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

  // 모든 옵션 초기화
  options.forEach((option) => option.classList.remove("selected"));

  if (value) {
    selectedText.textContent = value;
    // 해당 옵션 선택 표시
    const targetOption = dropdown.querySelector(`[data-value="${value}"]`);
    if (targetOption) {
      targetOption.classList.add("selected");
    }
  } else {
    selectedText.textContent = "선택하세요";
  }
}

// 결제 수단 배열 접근자
export function getPaymentMethods() {
  return paymentMethods;
}

export function setPaymentMethods(methods) {
  paymentMethods = methods;
}

// 실시간 폼 유효성 검사 함수
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
  // 초기 상태 설정
  const isValid = validateFormRealtime(
    dateInput,
    amountInput,
    contentInput,
    methodDropdown,
    categoryDropdown
  );
  updateSubmitButtonState(addBtn, isValid);

  // 유효성 검사 및 버튼 업데이트 함수
  function checkAndUpdateButton() {
    const isValid = validateFormRealtime(
      dateInput,
      amountInput,
      contentInput,
      methodDropdown,
      categoryDropdown
    );
    updateSubmitButtonState(addBtn, isValid);
  }

  // 각 입력 필드에 이벤트 리스너 추가
  dateInput.addEventListener("input", checkAndUpdateButton);
  dateInput.addEventListener("change", checkAndUpdateButton);
  amountInput.addEventListener("input", checkAndUpdateButton);
  amountInput.addEventListener("change", checkAndUpdateButton);
  contentInput.addEventListener("input", checkAndUpdateButton);
  contentInput.addEventListener("change", checkAndUpdateButton);

  // 드롭다운 변경 이벤트는 main.js에서 처리됨 (updateFormValidation 함수)
  // 여기서는 초기 설정만 수행
}

// 토글 버튼 이벤트 리스너 설정
export function setupToggleListeners(
  toggleBtns,
  updateAmountSign,
  amountInput
) {
  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const type = this.getAttribute("data-type");

      // 현재 활성화된 버튼 찾기
      const activeBtn = document.querySelector(".toggle-icon.active");

      // 같은 버튼을 클릭한 경우 토글 (상태 변경)
      if (activeBtn === this) {
        // 현재 상태와 반대 상태로 변경
        const newType = type === "minus" ? "plus" : "minus";
        const newBtn = document.querySelector(`[data-type="${newType}"]`);

        // 현재 버튼 비활성화
        this.classList.remove("active");
        // 반대 버튼 활성화
        newBtn.classList.add("active");

        // 토글 상태 업데이트
        window.currentToggleType = newType;
      } else {
        // 다른 버튼을 클릭한 경우 해당 버튼으로 변경
        // 모든 토글 버튼 비활성화
        toggleBtns.forEach((b) => b.classList.remove("active"));

        // 클릭된 버튼 활성화
        this.classList.add("active");

        // 현재 토글 상태 업데이트
        window.currentToggleType = type;
      }

      // 입력값이 있으면 부호 업데이트
      updateAmountSign(window.currentToggleType, amountInput);
    });
  });
}

// 날짜 입력 이벤트 리스너 설정
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

    // 현재 값과 다를 때만 업데이트
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

// 추가 버튼 클릭 이벤트 리스너 설정
export function setupAddButtonListeners(
  // 입력 폼 관련 쿼리
  addBtn,
  dateInput,
  amountInput,
  contentInput,
  methodDropdown,
  categoryDropdown,
  charCountSpan,
  validateFormData,
  processAmountSign,
  // 데이터 관련 함수
  createNewItem,
  renderHistoryList,
  dummyData,
  currentYear,
  currentMonth,
  historyList,
  enterEditMode,
  deleteItem,
  cancelEditMode
) {
  addBtn.addEventListener("click", function () {
    const date = dateInput.value;
    let amount = amountInput.value.replace(/,/g, "");
    const content = contentInput.value.trim();
    const method = window.getDropdownValue(methodDropdown);
    const category = window.getDropdownValue(categoryDropdown);

    // 유효성 검사
    if (!validateFormData(date, amount, content, method, category)) {
      return;
    }

    // 금액 부호 처리
    const amountNum = processAmountSign(amount, window.currentToggleType);

    if (window.isEditMode) {
      // 수정 모드: 기존 데이터 업데이트
      const index = window.editingItemIndex;
      window.dummyData[index] = {
        date,
        amount: amountNum,
        content,
        method,
        category,
      };

      // 수정 모드 종료
      if (typeof cancelEditMode === "function") {
        cancelEditMode();
      }
    } else {
      // 추가 모드: 새 아이템 생성
      const newItem = createNewItem(date, amountNum, content, method, category);
      window.dummyData.push(newItem);
    }

    // 입력 폼 초기화
    amountInput.value = "";
    contentInput.value = "";
    window.setDropdownValue(methodDropdown, "");
    window.setDropdownValue(categoryDropdown, "");
    charCountSpan.textContent = "0/32";

    // 토글 상태 초기화
    window.currentToggleType = "minus";
    window.toggleBtns.forEach((btn) => btn.classList.remove("active"));
    const minusToggle = document.querySelector('[data-type="minus"]');
    if (minusToggle) minusToggle.classList.add("active");

    // 리스트 다시 렌더링
    renderHistoryList(
      dummyData,
      window.currentYear,
      window.currentMonth,
      historyList,
      enterEditMode,
      deleteItem
    );

    window.updateFormValidation();
  });
}

export function enterEditMode(itemIndex) {
  // 전역 변수 수정
  window.isEditMode = true;
  window.editingItemIndex = itemIndex;

  const item = window.dummyData[itemIndex];

  // 입력 폼에 데이터 채우기
  window.dateInput.value = item.date;

  // 금액 입력란에 값 설정 (이벤트 리스너 우회)
  const amountValue = Math.abs(item.amount).toLocaleString();
  window.amountInput.type = "text";
  window.amountInput.value = amountValue;

  window.contentInput.value = item.content;
  window.setDropdownValue(window.methodDropdown, item.method);
  window.setDropdownValue(window.categoryDropdown, item.category);

  // 토글 상태 설정
  const isIncome = item.amount > 0;
  window.currentToggleType = isIncome ? "plus" : "minus";

  // 토글 버튼 상태 업데이트
  window.toggleBtns.forEach((btn) => btn.classList.remove("active"));
  const activeToggle = document.querySelector(
    `[data-type="${window.currentToggleType}"]`
  );
  if (activeToggle) activeToggle.classList.add("active");

  // 글자수 업데이트
  window.charCountSpan.textContent = `${window.contentInput.value.length}/32`;

  // 수정 모드에서는 모든 필드가 채워져 있으므로 폼 유효성 검사 업데이트
  setTimeout(() => {
    if (typeof window.updateFormValidation === "function") {
      window.updateFormValidation();
    }
  }, 10);
}

// 수정 모드 취소 함수
export function cancelEditMode() {
  // 전역 변수 수정
  window.isEditMode = false;
  window.editingItemIndex = -1;

  // 입력 폼 초기화
  window.amountInput.value = "";
  window.contentInput.value = "";
  window.setDropdownValue(window.methodDropdown, "");
  window.setDropdownValue(window.categoryDropdown, "");
  window.charCountSpan.textContent = "0/32";

  // 토글 상태 초기화
  window.currentToggleType = "minus";
  window.toggleBtns.forEach((btn) => btn.classList.remove("active"));
  const minusToggle = document.querySelector('[data-type="minus"]');
  if (minusToggle) minusToggle.classList.add("active");

  // 폼이 초기화되었으므로 버튼을 비활성화 상태로 설정
  updateSubmitButtonState(window.addBtn, false);

  // 모든 아이템에서 edit-mode 클래스 제거
  const items = document.querySelectorAll(".history-item");
  items.forEach((item) => item.classList.remove("edit-mode"));
}

// 렌더링 함수
export function renderHistoryList(
  dummyData,
  currentYear,
  currentMonth,
  historyList,
  enterEditMode
) {
  // 현재 선택된 월의 내역만 필터링
  const filteredData = getFilteredData(dummyData, currentYear, currentMonth);

  // 날짜별 그룹핑
  const grouped = {};

  filteredData.forEach((item) => {
    if (!grouped[item.date]) grouped[item.date] = [];
    grouped[item.date].push(item);
  });

  // 날짜 내림차순
  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  // 전체 합계/건수 계산 (필터링된 데이터 기준)
  let totalIncome = 0,
    totalExpense = 0;
  let totalCount = filteredData.length;

  // 리스트 HTML 생성
  let html = "";
  sortedDates.forEach((date) => {
    const items = grouped[date];
    let dayIncome = 0,
      dayExpense = 0;
    let itemsHtml = "";

    //TODO- 이중 for문이라, 최적화 가능하면 하기
    items.forEach((item, itemIndex) => {
      const isIncome = item.amount > 0;
      if (isIncome) dayIncome += item.amount;
      else dayExpense += -item.amount;

      // 전체 데이터에서 실제 인덱스 찾기
      const globalIndex = dummyData.findIndex(
        (dataItem) =>
          dataItem.date === item.date &&
          dataItem.content === item.content &&
          dataItem.amount === item.amount
      );

      itemsHtml += `
        <div class="history-item" data-index="${globalIndex}" style="cursor: pointer;">
          <div class="history-category category-${item.category.replace(
            "/",
            "/"
          )}">${item.category}</div>
          <div class="history-content">${item.content}</div>
          <div class="history-method">${item.method}</div>
          <div class="history-amount ${isIncome ? "plus" : "minus"}">${
        isIncome ? "" : "-"
      }${formatAmount(item.amount)}원</div>
          <div class="history-actions" style="display: none;" onclick="deleteItem(${globalIndex})">
            <img src="assets/icons/delete.svg" alt="삭제 아이콘"/>
            <p class="delete-btn" style=" color: #ff4444; cursor: pointer; font-size: 12px;">삭제</p>
          </div>
        </div>
      `;
    });

    // 날짜별 합계
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

  // 합계/건수 반영
  const summaryB = document.querySelectorAll(".summary-row b");
  if (summaryB.length >= 3) {
    summaryB[0].textContent = `${totalCount}건`;
    summaryB[1].textContent = formatAmount(totalIncome);
    summaryB[2].textContent = formatAmount(totalExpense);
  }

  // 아이템 클릭 시 수정 모드 진입/해제
  const items = historyList.querySelectorAll(".history-item");
  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      // 삭제 버튼 클릭 시에는 무시
      if (e.target.classList.contains("delete-btn")) return;

      const idx = parseInt(item.getAttribute("data-index"), 10);

      // 이미 수정 모드인 아이템을 클릭한 경우 해제
      if (item.classList.contains("edit-mode")) {
        // 모든 아이템에서 edit-mode 클래스 제거
        items.forEach((i) => i.classList.remove("edit-mode"));

        // 삭제 버튼 숨기기
        items.forEach(
          (i) => (i.querySelector(".history-actions").style.display = "none")
        );

        // 수정 모드 취소 함수 호출
        if (typeof window.cancelEditMode === "function") {
          window.cancelEditMode();
        }
        return;
      }

      // 새로운 아이템 클릭 시 수정 모드 진입
      if (typeof enterEditMode === "function") enterEditMode(idx);

      // 모든 아이템에서 edit-mode 클래스 제거
      items.forEach((i) => i.classList.remove("edit-mode"));

      // 클릭된 아이템에 edit-mode 클래스 추가
      item.classList.add("edit-mode");

      // 삭제 버튼 보이기
      items.forEach(
        (i) => (i.querySelector(".history-actions").style.display = "none")
      );
      item.querySelector(".history-actions").style.display = "flex";
    });
  });
}

// 헤더 버튼 이벤트 리스너 설정
export function setupHeaderListeners(
  currentYear,
  currentMonth,
  updateHeaderDate,
  updateInputDate,
  renderHistoryList,
  dateInput
) {
  const prevBtn = document.getElementById("prevMonthBtn");
  const nextBtn = document.getElementById("nextMonthBtn");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      updateHeaderDate(currentYear, currentMonth);
      updateInputDate(currentYear, currentMonth, dateInput);
      renderHistoryList();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      updateHeaderDate(currentYear, currentMonth);
      updateInputDate(currentYear, currentMonth, dateInput);
      renderHistoryList();
    });
  }
}
