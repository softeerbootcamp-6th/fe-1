// 폼 입력 관련 함수 관리 파일
import { elements } from "../elements.js";
import { formState } from "../state/formState.js";
let paymentOptions = ["현금", "신용카드", "추가하기"];
const categoryOptions = {
  minus: ["생활", "식비", "교통", "쇼핑/뷰티", "의료/건강", "문화/여가", "미분류"],
  plus: ["월급", "용돈", "기타 수입"],
};

// ------------ 지출/수입 +/- 토글 함수 ------------
const initToggleButton = () => {
  const toggleButtonEl = elements.toggleButtonEl();
  toggleButtonEl.addEventListener("click", () => {
    const currentSign = toggleButtonEl.textContent.trim();
    if (currentSign === "+") {
      toggleButtonEl.textContent = "-";
      formState.valueSign = "minus";
    } else {
      toggleButtonEl.textContent = "+";
      formState.valueSign = "plus";
    }
    initCategoryDropdown();
  });
};

// ------------ 드롭다운 로직 ------------
const initDropdown = ({
  containerSelector,
  selectedSelector,
  arrowSelector,
  optionsSelector,
  options,
}) => {
  const dropdown = document.querySelector(containerSelector);
  if (!dropdown) return;
  const selectedP = dropdown.querySelector(selectedSelector);
  const arrow = dropdown.querySelector(arrowSelector);
  const optionsUl = dropdown.querySelector(optionsSelector);

  optionsUl.innerHTML = options
    .map((option) => `<div class="dropdown-option">${option}</div>`)
    .join("");

  if (dropdown.dataset.initialized) return;

  dropdown.addEventListener("click", toggleDropdown);
  dropdown.dataset.initialized = "true";

  function toggleDropdown(e) {
    e.stopPropagation();
    const isOpen = optionsUl.style.display === "block";
    if (isOpen) {
      optionsUl.setAttribute("style", "display: none");
    } else {
      optionsUl.setAttribute("style", "display: block");
    }
    arrow.style.transform = isOpen ? "" : "rotate(180deg)";
  }

  optionsUl.addEventListener("click", (e) => {
    e.stopPropagation();
    selectedP.textContent = e.target.textContent;
    optionsUl.style.display = "none";
    arrow.style.transform = "";

    validateForm();
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      optionsUl.style.display = "none";
      arrow.style.transform = "";
    }
  });
};

const initPaymentDropdown = () => {
  initDropdown({
    containerSelector: ".payment-cell",
    selectedSelector: ".selected-payment",
    arrowSelector: ".payment-arrow-icon",
    optionsSelector: ".payment-dropdown-options",
    options: paymentOptions,
  });
};

const initCategoryDropdown = () => {
  initDropdown({
    containerSelector: ".category-cell",
    selectedSelector: ".selected-category",
    arrowSelector: ".category-arrow-icon",
    optionsSelector: ".category-dropdown-options",
    options: categoryOptions[formState.valueSign],
  });
};

// ------------ 입력값 감지 및 유효성 검증 ------------
const validateForm = () => {
  const date = elements.dateInputEl().value;
  const value = elements.valueInputEl().value;
  const description = elements.descInputEl().value;
  const payment = elements.paymentCellEl().textContent.trim();
  const category = elements.categoryCellEl().textContent.trim();

  const isValid =
    date &&
    value &&
    !isNaN(value) &&
    description.trim() !== "" &&
    payment !== "선택하세요" &&
    category !== "선택하세요";

  if (isValid) {
    enableSubmitButton();
  } else {
    disableSubmitButton();
  }
};

const initInputChanges = () => {
  elements.dateInputEl().addEventListener("input", validateForm);
  elements.valueInputEl().addEventListener("input", validateForm);
  elements.descInputEl().addEventListener("input", validateForm);
};

// ------------ 제출 버튼 활성화 / 비활성화 ------------
const enableSubmitButton = () => {
  const submitButtonEl = elements.submitButtonEl();
  const checkboxEl = elements.checkBoxEl();

  submitButtonEl.disabled = false;
  checkboxEl.setAttribute("fill", "var(--neutral-text-default)");
};

const disableSubmitButton = () => {
  const submitButtonEl = elements.submitButtonEl();
  const checkboxEl = elements.checkBoxEl();

  submitButtonEl.disabled = true;
  checkboxEl.setAttribute("fill", "gray");
};

// ------------ export 묶음 ------------
export {
  initToggleButton,
  initDropdown,
  initPaymentDropdown,
  initCategoryDropdown,
  validateForm,
  initInputChanges,
  enableSubmitButton,
  disableSubmitButton,
};
