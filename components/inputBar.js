import { dateStore, transactionStore } from "../store/index.js";
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
  DESCRIPTION: "description",
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
  const today = dateStore.getDate().toISOString().split("T")[0];
  return `
  <form class="input-bar flex-row" id="inputBarForm">
    <label class="flex-column input-section">
      <div class="input-label light-12">일자</div>
      <input type="date" name="date" class="date-input semibold-12" required value="${today}" />
    </label>
    <label class="flex-column input-section">
      <div class="input-label light-12">금액</div>
      <div class="flex-row semibold-12">
        <button type="button" class="amount-toggle" data-sign="+">
          <img src="../icons/plus.svg" alt="plus" />
        </button>
        <input type="number" name="amount" placeholder="0" min="0" required class="semibold-12 text-input" />
        <div class="semibold-12">원</div>
      </div>
    </label>
    <label class="flex-column input-section">
      <div class="input-label light-12">내용</div>
      <input type="text" name="description" maxlength="32" placeholder="내용을 입력하세요" required class="semibold-12 text-input" />
    </label>
    <label class="flex-column input-section">
      <div class="input-label light-12">결제수단</div>
      <select name="paymentMethod" required class="semibold-12 text-input">
        <option value="" disabled selected hidden>선택하세요</option>
        <option value="현금">현금</option>
        <option value="카드">카드</option>
        <option value="추가하기">추가하기</option>
      </select>
    </label>
    <label class="flex-column w-full px-20">
      <div class="input-label light-12">분류</div>
      <select name="category" required class="semibold-12 text-input">
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
      <button type="submit" class="add-button" id="submitButton">
        <img src="../icons/check.svg" alt="check" />
      </button>
    </div>
  </form>
  `;
}

function getFormElements(form) {
  return {
    dateInput: form.querySelector(`input[name='${FORM_FIELDS.DATE}']`),
    amountInput: form.querySelector(`input[name='${FORM_FIELDS.AMOUNT}']`),
    descriptionInput: form.querySelector(
      `input[name='${FORM_FIELDS.DESCRIPTION}']`
    ),
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

function getRequiredFields(elements) {
  return {
    dateInput: elements.dateInput,
    amountInput: elements.amountInput,
    descriptionInput: elements.descriptionInput,
    paymentMethodSelect: elements.paymentMethodSelect,
    categorySelect: elements.categorySelect,
  };
}

function validateForm(fields, submitButton) {
  const isValid = Object.values(fields).every((field) => {
    if (field.tagName === "SELECT") return field.value !== "";
    return field.value.trim() !== "";
  });
  submitButton.disabled = !isValid;
  submitButton.classList.toggle("disabled", !isValid);
}

function updateAmountToggleIcon(toggle, isPositive) {
  const icon = isPositive ? "plus.svg" : "minus.svg";
  const sign = isPositive ? "+" : "-";
  toggle.querySelector("img").src = `../icons/${icon}`;
  toggle.querySelector("img").alt = sign;
  toggle.dataset.sign = sign;
}

function resetForm(form, elements) {
  form.reset();
  validateForm(getRequiredFields(elements), elements.submitButton);
}

//TODO: 폼 데이터 처리 방식 고민해보기. formData 객체 활용
function processFormData(formData, amountToggle) {
  const data = Object.fromEntries(formData.entries());
  console.log(data, formData, formData.entries());
  data.amount =
    amountToggle.dataset.sign === "-"
      ? -Math.abs(+data.amount)
      : Math.abs(+data.amount);
  return data;
}

export function fillFormWithTransaction(transaction) {
  const form = document.getElementById("inputBarForm");
  if (!form || !transaction) return;

  const elements = getFormElements(form);
  const fields = getRequiredFields(elements);

  elements.dateInput.value = transaction.date;
  elements.amountInput.value = Math.abs(transaction.amount);

  updateAmountToggleIcon(elements.amountToggle, transaction.amount > 0);
  updateCategoryOptions(elements, transaction.amount > 0);
  elements.descriptionInput.value = transaction.description;
  elements.paymentMethodSelect.value = transaction.paymentMethod;
  elements.categorySelect.value = transaction.category;

  isEditMode = true;
  editingTransactionId = transaction.id;

  validateForm(fields, elements.submitButton);
}

export function resetEditMode() {
  isEditMode = false;
  editingTransactionId = null;
  document
    .querySelectorAll(".transaction-row.selected")
    .forEach((row) => row.classList.remove("selected"));
}

export function cancelEditMode() {
  const form = document.getElementById("inputBarForm");
  if (!form) return;
  const elements = getFormElements(form);
  resetForm(form, elements);
  resetEditMode();
}

function updateCategoryOptions(elements, isIncome) {
  elements.categorySelect.innerHTML = createCategoryOptions(isIncome);
}

export function renderInputBar(container) {
  container.innerHTML = createInputBar();

  const form = container.querySelector("#inputBarForm");
  const elements = getFormElements(form);
  const fields = getRequiredFields(elements);

  //TODO: 모든 필드에 대해 이벤트 리스너 이벤트 위임 방식 고민해보기
  Object.values(fields).forEach((field) => {
    const type = field.tagName === "SELECT" ? "change" : "input";
    field.addEventListener(type, () =>
      validateForm(fields, elements.submitButton)
    );
  });

  validateForm(fields, elements.submitButton);

  if (elements.amountToggle) {
    elements.amountToggle.addEventListener("click", () => {
      const isPositive = elements.amountToggle.dataset.sign === "+";
      updateAmountToggleIcon(elements.amountToggle, !isPositive);
      updateCategoryOptions(elements, !isPositive);
    });
    updateCategoryOptions(elements, true);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = processFormData(formData, elements.amountToggle);

    if (isEditMode && editingTransactionId) {
      transactionStore.updateTransaction(
        dateStore.getYear(),
        dateStore.getMonth(),
        editingTransactionId,
        data
      );
      resetEditMode();
    } else {
      transactionStore.addTransaction(
        dateStore.getYear(),
        dateStore.getMonth(),
        data
      );
    }

    resetForm(form, elements);
  });
}
