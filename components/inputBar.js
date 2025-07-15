import {
  addNewTransaction,
  updateTransaction,
  monthlyTotalData,
  getTransactionsByYearMonth,
} from "../utils/transaction.js";
import { getCurrentYear, getCurrentMonth } from "../utils/currentDate.js";
import { renderTransactionList } from "./transactionsList.js";
import { getFilteringState } from "../pages.js";
import { renderMonthlyInfo, renderTotalCount } from "./monthlyInfo.js";
import {
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
} from "../constants/category.js";

// 수정 모드 상태 관리
let isEditMode = false;
let editingTransactionId = null;

// 폼 필드 이름 상수
const FORM_FIELDS = {
  DATE: "date",
  AMOUNT: "amount",
  CONTENT: "content",
  PAYMENT_METHOD: "paymentMethod",
  CATEGORY: "category",
};

function createCategoryOptions(isIncome) {
  const categories = isIncome ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  return [
    `<option value="" disabled selected hidden>선택하세요</option>`,
    ...categories.map((cat) => `<option value="${cat}">${cat}</option>`),
    `<option value="추가하기">추가하기</option>`,
  ].reduce((acc, cur) => acc + cur, "");
}

export function createInputBar() {
  return ` 
  <form
    class="input-bar flex-row"
    id="inputBarForm"
  >
    <label class="flex-column input-section">
      <div class="input-label light-12">일자</div>
      <input type="date" name="date" class="date-input semibold-12" required value="${
        new Date().toISOString().split("T")[0]
      }" />
    </label>
    <label class="flex-column input-section">
      <div class="input-label light-12">금액</div>
      <div class="flex-row semibold-12">
        <button
          type="button"
          class="amount-toggle"
          data-sign="+"
        >
          <img src="../icons/plus.svg" alt="plus" />
        </button>
        <input
          type="number"
          name="amount"
          placeholder="0"
          min="0"
          required
          class="semibold-12 text-input"
        />
        <div class="semibold-12">원</div>
      </div>
    </label>
    <label class="flex-column input-section">
      <div class="input-label light-12">내용</div>
      <input
        type="text"
        name="content"
        maxlength="32"
        placeholder="내용을 입력하세요"
        required
        class="semibold-12 text-input"
      />
    </label>
    <label class="flex-column input-section">
      <div class="input-label light-12">결제수단</div>
      <select
        name="paymentMethod"
        required
        class="semibold-12 text-input"
      >
        <option value="" disabled selected hidden>선택하세요</option>
        <option value="현금">현금</option>
        <option value="카드">카드</option>
        <option value="추가하기">추가하기</option>
      </select>
    </label>
    <label class="flex-column w-full px-20">
      <div class="input-label light-12">분류</div>
      <select
        name="category"
        required
        class="semibold-12 text-input"
      >
        <option value="" disabled selected hidden>선택하세요</option>
        <option value="생활">생활</option>
        <option value="식비">식비</option>
        <option value="교통">교통</option>
        <option value="쇼핑/뷰티">쇼핑/뷰티</option>
        <option value="의료/건강">의료/건강</option>
        <option value="문화/여가">문화/여가</option>
        <option value="미분류">미분류</option>
      </select>
    </label>
    <div class="flex-column">
      <button
        type="submit"
        class="add-button"
        id="submitButton"
      >
        <img src="../icons/check.svg" alt="check" />
      </button>
    </div>
  </form>
  `;
}

// 폼 요소들을 가져오는 함수
function getFormElements(form) {
  return {
    dateInput: form.querySelector(`input[name='${FORM_FIELDS.DATE}']`),
    amountInput: form.querySelector(`input[name='${FORM_FIELDS.AMOUNT}']`),
    contentInput: form.querySelector(`input[name='${FORM_FIELDS.CONTENT}']`),
    paymentMethodSelect: form.querySelector(
      `select[name='${FORM_FIELDS.PAYMENT_METHOD}']`
    ),
    categorySelect: form.querySelector(
      `select[name='${FORM_FIELDS.CATEGORY}']`
    ),
    amountToggle: form.querySelector(".amount-toggle"),
    submitButton: form.querySelector("#submitButton"),
  };
}

// 금액 토글 아이콘 변경 함수
function updateAmountToggleIcon(amountToggle, isPositive) {
  const icon = isPositive ? "plus.svg" : "minus.svg";
  const sign = isPositive ? "+" : "-";
  amountToggle.querySelector("img").src = `../icons/${icon}`;
  amountToggle.querySelector("img").alt = sign;
  amountToggle.dataset.sign = sign;
}

// 폼 초기화 함수
function resetForm(form, elements) {
  form.reset();
  updateAmountToggleIcon(elements.amountToggle, true);
  validateForm(getRequiredFields(elements), elements.submitButton);
}

// 필수 필드 배열 생성 함수
function getRequiredFields(elements) {
  return [
    elements.dateInput,
    elements.amountInput,
    elements.contentInput,
    elements.paymentMethodSelect,
    elements.categorySelect,
  ];
}

// 폼 데이터 처리 함수
function processFormData(formData, amountToggle) {
  const data = Object.fromEntries(formData.entries());

  // amountToggle 상태에 따라 금액 부호 결정
  if (amountToggle && amountToggle.dataset.sign === "-") {
    data.amount = -Math.abs(parseInt(data.amount));
  } else {
    data.amount = Math.abs(parseInt(data.amount));
  }

  return data;
}

// 폼을 거래내역 데이터로 채우는 함수
export function fillFormWithTransaction(transaction) {
  const form = document.getElementById("inputBarForm");
  if (!form || !transaction) return;

  const {
    dateInput,
    amountInput,
    contentInput,
    paymentMethodSelect,
    categorySelect,
    amountToggle,
    submitButton,
  } = getFormElements(form);

  // 폼 필드에 데이터 설정
  dateInput.value = transaction.date;
  amountInput.value = Math.abs(transaction.amount);
  contentInput.value = transaction.description;
  paymentMethodSelect.value = transaction.paymentMethod;
  categorySelect.value = transaction.category;

  // 금액 토글 설정
  updateAmountToggleIcon(amountToggle, transaction.amount > 0);

  // 수정 모드로 설정
  isEditMode = true;
  editingTransactionId = transaction.id;

  // 유효성 검사 실행
  validateForm(
    [dateInput, amountInput, contentInput, paymentMethodSelect, categorySelect],
    submitButton
  );
}

// 수정 모드 초기화 함수
export function resetEditMode() {
  isEditMode = false;
  editingTransactionId = null;

  // 선택된 행 스타일 초기화
  const selectedRows = document.querySelectorAll(".transaction-row.selected");
  selectedRows.forEach((row) => row.classList.remove("selected"));
}

// 수정 모드 해제 함수 (폼 초기화 포함)
export function cancelEditMode() {
  const form = document.getElementById("inputBarForm");
  if (form) {
    const elements = getFormElements(form);

    // 폼 초기화
    resetForm(form, elements);

    // 수정 모드 상태 초기화
    resetEditMode();
  }
}

function validateForm(requiredFields, submitButton) {
  const isValid = requiredFields.every((field) => {
    if (field.tagName === "SELECT") {
      return field.value !== "";
    }
    return field.value.trim() !== "";
  });
  submitButton.disabled = !isValid;
  submitButton.classList.toggle("disabled", !isValid);
}

export function renderInputBar(container) {
  container.innerHTML = createInputBar();

  const form = container.querySelector("#inputBarForm");
  const elements = getFormElements(form);
  const requiredFields = getRequiredFields(elements);

  // 카테고리 select 요소 가져오기
  const categorySelect = elements.categorySelect;

  // 카테고리 옵션을 동적으로 변경하는 함수
  function updateCategoryOptions(isIncome) {
    categorySelect.innerHTML = createCategoryOptions(isIncome);
  }

  // 모든 필드에 이벤트 리스너 추가
  requiredFields.forEach((field) => {
    const eventType = field.tagName === "SELECT" ? "change" : "input";
    field.addEventListener(eventType, () =>
      validateForm(requiredFields, elements.submitButton)
    );
  });

  // 초기 상태 검사
  validateForm(requiredFields, elements.submitButton);

  // 금액 토글 이벤트 리스너
  if (elements.amountToggle) {
    elements.amountToggle.addEventListener("click", () => {
      const isCurrentlyPositive = elements.amountToggle.dataset.sign === "+";
      updateAmountToggleIcon(elements.amountToggle, !isCurrentlyPositive);

      // 부호에 따라 카테고리 옵션 변경
      updateCategoryOptions(!isCurrentlyPositive);
    });

    // 페이지 최초 렌더 시 카테고리 옵션도 초기화
    updateCategoryOptions(true);
  }

  // 폼 제출 이벤트 리스너
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = processFormData(formData, elements.amountToggle);

    if (isEditMode && editingTransactionId) {
      // 수정 모드: 기존 거래내역 수정
      updateTransaction(
        getCurrentYear(),
        getCurrentMonth(),
        editingTransactionId,
        data
      );
      resetEditMode();
    } else {
      // 추가 모드: 새로운 거래내역 추가
      addNewTransaction(getCurrentYear(), getCurrentMonth(), data);
      // 새로운 거래내역 추가 시 선택 상태 초기화
      const selectedRows = document.querySelectorAll(
        ".transaction-row.selected"
      );
      selectedRows.forEach((row) => row.classList.remove("selected"));
    }

    // 폼 초기화
    resetForm(form, elements);

    // 거래내역 목록 업데이트
    const { isIncomeChecked, isExpenseChecked } = getFilteringState();
    const monthlyInfoContainer = document.querySelector(
      "#monthly-info-container"
    );
    renderMonthlyInfo(monthlyInfoContainer, isIncomeChecked, isExpenseChecked);
    renderTotalCount(
      monthlyInfoContainer,
      isIncomeChecked,
      isExpenseChecked,
      monthlyTotalData(
        getTransactionsByYearMonth(getCurrentYear(), getCurrentMonth())
      )
    );
    renderTransactionList(isIncomeChecked, isExpenseChecked);
  });
}
