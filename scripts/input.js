export const elements = {
  dateInputEl: () => document.querySelector(".date-input"),
  toggleButtonEl: () => document.querySelector(".toggle-button"),
  valueInputEl: () => document.querySelector(".value-number"),
  descInputEl: () => document.querySelector(".description-input"),
  submitButtonEl: () => document.querySelector(".submit-button"),
  paymentCellEl: () => document.querySelector(".payment-dropdown"),
  categoryCellEl: () => document.querySelector(".category-dropdown"),
};

const paymentOptions = ["현금", "신용카드", "추가하기"];
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

// 결제수단 드롭다운 로직
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

  // Render payment options
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

// 폼 제출 버튼 클릭시 현재 입력값을 가져오는 함수
export const getInputValues = () => {
  const submitButtonEl = elements.submitButtonEl();
  submitButtonEl.addEventListener("click", (event) => {
    event.preventDefault();
    const date = elements.dateInputEl().value;
    const sign = elements.toggleButtonEl().textContent.trim();
    const value = elements.valueInputEl().value;
    const description = elements.descInputEl().value;

    console.log("Input values:", {
      date,
      sign,
      value,
      description,
    });

    return {
      date,
      sign,
      value,
      description,
    };
  });
};
