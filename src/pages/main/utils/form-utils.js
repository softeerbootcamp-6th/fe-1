import { showModal } from "../../../layouts/modal/modal.js";
import { getPaymentMethods as getPaymentMethodsApi } from "../../../api/payment-method.js";

// 제출 버튼 상태 업데이트
export function updateSubmitButtonState(addBtn, isValid) {
  const imgElement = addBtn.querySelector("img");
  if (imgElement) {
    imgElement.src = isValid
      ? "assets/icons/black-check.svg"
      : "assets/icons/unchecked.svg";
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

// 결제 수단 배열 접근자
export async function getPaymentMethods() {
  const paymentMethods = await getPaymentMethodsApi();
  return paymentMethods;
}

// 결제 수단 배열 설정
export function setPaymentMethods(methods) {
  paymentMethods = methods;
}
