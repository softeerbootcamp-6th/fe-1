import { elements } from "./elements";

let paymentOptions = ["현금", "신용카드", "추가하기"];
const categoryOptions = ["생활", "식비", "교통", "쇼핑/뷰티", "의료/건강", "문화/여가", "미분류"];

// 지출/수입 +/- 토글 함수
export const initToggleButton = () => {
  const toggleButtonEl = elements.toggleButtonEl();
  toggleButtonEl.addEventListener("click", () => {
    console.log("Toggle button clicked");
    const currentSign = toggleButtonEl.textContent.trim();
    toggleButtonEl.textContent = currentSign === "+" ? "-" : "+";
  });
};

// 드롭다운 로직
export const initDropdown = ({
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

  // 옵션 렌더링
  optionsUl.innerHTML = options
    .map((option) => `<div class="dropdown-option">${option}</div>`)
    .join("");

  dropdown.addEventListener("click", toggleDropdown);

  // 드롭다운 토글 함수
  function toggleDropdown(e) {
    e.stopPropagation();
    const isOpen = optionsUl.style.display === "block";
    optionsUl.style.display = isOpen ? "none" : "block";
    arrow.style.transform = isOpen ? "" : "rotate(180deg)";
  }

  // 옵션 선택 시 처리
  optionsUl.addEventListener("click", (e) => {
    e.stopPropagation();
    selectedP.textContent = e.target.textContent;
    optionsUl.style.display = "none";
    arrow.style.transform = "";

    // 유효성 검증
    validateForm();
  });

  // 드롭다운 바깥 클릭 시 닫기
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      optionsUl.style.display = "none";
      arrow.style.transform = "";
    }
  });
};

export const initPaymentDropdown = () => {
  initDropdown({
    containerSelector: ".payment-cell",
    selectedSelector: ".selected-payment",
    arrowSelector: ".payment-arrow-icon",
    optionsSelector: ".payment-dropdown-options",
    options: paymentOptions,
  });
};

export const initCategoryDropdown = () => {
  initDropdown({
    containerSelector: ".category-cell",
    selectedSelector: ".selected-category",
    arrowSelector: ".category-arrow-icon",
    optionsSelector: ".category-dropdown-options",
    options: categoryOptions,
  });
};

// 폼 검증 함수
const validateForm = () => {
  const date = elements.dateInputEl().value;
  const value = elements.valueInputEl().value;
  const description = elements.descInputEl().value;
  const payment = elements.paymentCellEl().textContent.trim();
  const category = elements.categoryCellEl().textContent.trim();

  const isValid =
    date && // 날짜가 비어있지 않은지 확인
    value && // 금액이 비어있지 않은지 확인
    !isNaN(value) && // 금액이 숫자인지 확인
    description.trim() !== "" && // 설명이 비어있지 않은지 확인
    payment !== "선택하세요" && // 결제수단이 선택되었는지 확인
    category !== "선택하세요"; // 분류가 선택되었는지 확인

  if (isValid) {
    enableSubmitButton(); // 모든 입력값이 유효하면 제출 버튼 활성화
  } else {
    disableSubmitButton(); // 하나라도 유효하지 않으면 제출 버튼 비활성화
  }
};

// 폼 제출 버튼 활성화 함수 : 입력값이 유효할 때만 호출되기 때문에 따로 검증은 없음
export const enableSubmitButton = () => {
  const submitButtonEl = elements.submitButtonEl();
  const checkboxEl = elements.checkBoxEl();

  submitButtonEl.disabled = false;
  checkboxEl.setAttribute("fill", "var(--neutral-text-default)");
};

// 폼 제출 버튼 비활성화 함수 : 입력값이 유효하지 않으면 호출
export const disableSubmitButton = () => {
  const submitButtonEl = elements.submitButtonEl();
  const checkboxEl = elements.checkBoxEl();

  submitButtonEl.disabled = true;
  checkboxEl.setAttribute("fill", "gray");
};

// 입력 값이 변경되는지 감시하는 함수
export const initInputChanges = () => {
  elements.dateInputEl().addEventListener("input", validateForm);
  elements.valueInputEl().addEventListener("input", validateForm);
  elements.descInputEl().addEventListener("input", validateForm);
  // 드롭다운 선택 수단들은 해당 함수에서 호출됨
};

// 폼 제출 버튼 클릭시 현재 입력값을 가져오는 함수
export const getInputValues = () => {
  const submitButtonEl = elements.submitButtonEl();
  submitButtonEl.addEventListener("click", (event) => {
    event.preventDefault();
    const date = elements.dateInputEl().value;
    const sign = elements.toggleButtonEl().textContent.trim();
    const value = elements.valueInputEl().value;
    const description = elements.descInputEl().value;
    const payment = elements.paymentCellEl().textContent.trim();
    const category = elements.categoryCellEl().textContent.trim();

    console.log("Input Values:", {
      date,
      sign,
      value,
      description,
      payment,
      category,
    });

    return {
      date,
      sign,
      value,
      description,
      payment,
      category,
    };
  });
};
