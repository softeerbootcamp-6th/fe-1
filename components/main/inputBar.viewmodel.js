import { createCategoryOptions, createInputBar } from "./inputBar.view.js";
import { transactionStore, dateStore } from "../../store/index.js";
import { FORM_FIELDS } from "../../constants/form.js";

// 수정 모드 상태 관리
let isEditMode = false;
let editingTransactionId = null;

export function initInputBar(container) {
  const form = container.querySelector("#inputBarForm");
  const elements = getFormElements(form);
  const fields = getRequiredFields(elements);
  validateForm(fields, elements.submitButton);

  form.addEventListener("input", () => {
    validateForm(fields, elements.submitButton);
  });

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

export function renderInputBar(container) {
  const today = dateStore.getDate().toISOString().split("T")[0];
  container.innerHTML = createInputBar(today);
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
