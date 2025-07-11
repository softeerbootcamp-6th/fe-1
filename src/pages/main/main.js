import { dummyData } from "../../constants/dummy.js";
import {
  updateAmountSign,
  setupAmountInputListeners,
  setupContentInputListeners,
} from "../../utils/formatUtils.js";
import { updateHeaderDate, updateInputDate } from "../../utils/dateUtils.js";
import {
  renderHistoryList,
  enterEditMode,
  cancelEditMode,
  setupToggleListeners,
  setupDateInputListeners,
  setupAddButtonListeners,
  setupRealtimeValidation,
  setupCustomDropdowns,
  getDropdownValue,
  setDropdownValue,
  updateFormValidation,
  getPaymentMethods,
} from "../../utils/uiUtils.js";
import { initModal } from "../../layouts/modal/modal.js";
import {
  validateFormData,
  processAmountSign,
  createNewItem,
  deleteItem,
  onMonthChanged,
} from "../../utils/dataUtils.js";

function initMain() {
  // DOM 쿼리
  const contentInput = document.querySelector(".input-cell.content input");
  const charCountSpan = document.querySelector(
    ".input-cell.content .char-count"
  );
  const addBtn = document.querySelector(".input-cell.submit button");
  const dateInput = document.querySelector(".date-input");
  const amountInput = document.querySelector(".amount-input");
  const methodDropdown = document.querySelector(
    ".input-cell.method .custom-dropdown"
  );
  const categoryDropdown = document.querySelector(
    ".input-cell.category .custom-dropdown"
  );
  const historyList = document.querySelector(".history-list");
  const toggleBtns = document.querySelectorAll(".toggle-icon");

  // 현재 선택된 월/년 (헤더와 동기화)
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();

  // 현재 토글 상태 (기본값: 지출)
  let currentToggleType = "minus";

  // 수정 모드 상태
  let isEditMode = false;
  let editingItemIndex = -1;

  // 전역 변수들을 window 객체에 등록
  window.dummyData = dummyData;
  window.dateInput = dateInput;
  window.amountInput = amountInput;
  window.contentInput = contentInput;
  window.methodDropdown = methodDropdown;
  window.categoryDropdown = categoryDropdown;
  window.charCountSpan = charCountSpan;
  window.currentToggleType = currentToggleType;
  window.toggleBtns = toggleBtns;
  window.addBtn = addBtn;
  window.isEditMode = isEditMode;
  window.editingItemIndex = editingItemIndex;
  window.currentYear = currentYear;
  window.currentMonth = currentMonth;
  window.historyList = historyList;

  // 전역 함수들을 window 객체에 등록(랜더링 및 모드 관련 함수만 등록)
  window.renderHistoryList = renderHistoryList;
  window.enterEditMode = enterEditMode;
  window.cancelEditMode = cancelEditMode;
  window.deleteItem = deleteItem;
  window.updateHeaderDate = updateHeaderDate;
  window.updateInputDate = updateInputDate;
  window.getDropdownValue = getDropdownValue;
  window.setDropdownValue = setDropdownValue;
  window.updateFormValidation = updateFormValidation;

  // 이벤트 리스너 설정
  setupToggleListeners(
    toggleBtns,
    currentToggleType,
    updateAmountSign,
    amountInput
  );
  setupDateInputListeners(
    dateInput,
    currentYear,
    currentMonth,
    updateHeaderDate,
    renderHistoryList,
    dummyData,
    historyList,
    enterEditMode,
    deleteItem
  );
  setupAmountInputListeners(amountInput, isEditMode, editingItemIndex);
  setupContentInputListeners(contentInput, charCountSpan);
  setupAddButtonListeners(
    addBtn,
    dateInput,
    amountInput,
    contentInput,
    methodDropdown,
    categoryDropdown,
    charCountSpan,
    validateFormData,
    processAmountSign,
    createNewItem,
    renderHistoryList,
    dummyData,
    currentYear,
    currentMonth,
    historyList,
    enterEditMode,
    deleteItem,
    cancelEditMode
  );

  // 실시간 유효성 검사 설정
  setupRealtimeValidation(
    dateInput,
    amountInput,
    contentInput,
    methodDropdown,
    categoryDropdown,
    addBtn
  );

  // 최초 렌더링
  updateHeaderDate(currentYear, currentMonth);
  updateInputDate(currentYear, currentMonth, dateInput);
  renderHistoryList(
    dummyData,
    currentYear,
    currentMonth,
    historyList,
    enterEditMode,
    deleteItem
  );

  // 커스텀 드롭다운 이벤트 설정 (DOM이 준비된 후)
  setupCustomDropdowns();

  // 모달 초기화 (렌더링 및 이벤트 리스너 설정)
  initModal();
}

window.initMain = initMain;
// 헤더 월 변경 시 호출될 전역 함수 - 입력 폼 변경, renderHistoryList 호출, 캘린더 렌더링
window.onMonthChanged = onMonthChanged;
// 수정 모드 취소 함수를 전역으로 등록
window.cancelEditMode = cancelEditMode;
