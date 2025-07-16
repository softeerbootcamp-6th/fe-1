// input 바에서 사용하는 드롭다운, 유효성 검증, 글자수 세기 등의 로직을 다루는 파일
import { addRecordsToServer } from "../api/recordsApi.js";
import { store } from "./store.js";
import { elements } from "./elements.js";

let isEditMode = false;
let editingItem = null;

let valueSign = "minus"; // or "plus"
let paymentOptions = ["현금", "신용카드", "추가하기"];
const categoryOptions = {
  minus: ["생활", "식비", "교통", "쇼핑/뷰티", "의료/건강", "문화/여가", "미분류"],
  plus: ["월급", "용돈", "기타 수입"],
};
// 지출/수입 +/- 토글 함수
export const initToggleButton = () => {
  const toggleButtonEl = elements.toggleButtonEl();
  toggleButtonEl.addEventListener("click", () => {
    const currentSign = toggleButtonEl.textContent.trim();
    if (currentSign === "+") {
      toggleButtonEl.textContent = "-";
      valueSign = "minus";
    } else {
      toggleButtonEl.textContent = "+";
      valueSign = "plus";
    }
    initCategoryDropdown();
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

  //
  if (dropdown.dataset.initialized) {
    // 이미 초기화 되었다면 옵션만 바꾸고 함수 종료
    return;
  }

  dropdown.addEventListener("click", toggleDropdown);
  dropdown.dataset.initialized = "true";

  // 드롭다운 토글 함수
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
    options: categoryOptions[valueSign],
  });
};

// 폼 검증 함수
export const validateForm = () => {
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
    const amount = sign + value;

    const itemId = isEditMode
      ? editingItem.itemId
      : Date.now().toString() + Math.random().toString().slice(2, 5);
    const recordId = isEditMode ? editingItem.dateId : Date.now().toString();

    const formInput = {
      recordId,
      date,
      item: {
        id: itemId,
        category,
        description,
        payment,
        amount,
      },
    };
    if (isEditMode) {
      console.log("수정할 아이템:", formInput);
      isEditMode = false;
      editingItem = null;
    } else {
      // 로컬 store에 추가
      addRecordsToServer(formInput).then(() => {
        store.addRecordToStore(formInput);
      });
    }
  });
};

export function initModifyEvent() {
  const recordContainerEl = elements.recordContainerEl();

  recordContainerEl.addEventListener("click", (e) => {
    const recordItemEl = e.target.closest(".record-item");
    if (!recordItemEl) return;

    const prevSelected = recordContainerEl.querySelector(".record-item.selected");
    if (prevSelected) prevSelected.classList.remove("selected");

    recordItemEl.classList.add("selected");

    const dateId = recordItemEl.closest(".record-container").getAttribute("date-id");
    const itemId = recordItemEl.getAttribute("item-id");

    editingItem = {
      dateId,
      itemId,
    };
    isEditMode = true;

    const record = store.getRecords().find((r) => r.id.toString() === dateId.toString());
    const item = record.items.find((r) => r.id.toString() === itemId.toString());

    const amount = item.amount;
    const sign = amount < 0 ? "-" : "+";
    const value = Math.abs(amount);

    elements.dateInputEl().value = record.date;
    elements.toggleButtonEl().textContent = sign;
    elements.valueInputEl().value = value;
    elements.descInputEl().value = item.description;
    elements.paymentCellEl().textContent = item.payment;
    elements.categoryCellEl().textContent = item.category;
    validateForm();
  });
}
