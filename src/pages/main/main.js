import { accountBookStore } from "../../store/account-book-store.js";
import {
  updateAmountSign,
  setupAmountInputListeners,
  setupContentInputListeners,
} from "../../utils/formatUtils.js";
import { updateHeaderDate, updateInputDate } from "../../utils/dateUtils.js";
import {
  setupGlobalVariables,
  setupGlobalFunctions,
  setupStoreSubscription,
  setupMainEventListeners,
  initializeRendering,
  initializeModal,
} from "./main-uiUtils.js";
import { initModal } from "../../layouts/modal/modal.js";
import {
  validateFormData,
  processAmountSign,
  createNewItem,
  deleteItem,
  onMonthChanged,
  getFilteredData,
} from "../../utils/dataUtils.js";

function initMain() {
  // 전역 변수들을 window 객체에 등록
  const elements = setupGlobalVariables();

  // 전역 함수들을 window 객체에 등록
  setupGlobalFunctions(
    accountBookStore,
    deleteItem,
    updateHeaderDate,
    updateInputDate,
    getFilteredData,
    onMonthChanged
  );

  // Store 변경 감지 설정
  setupStoreSubscription(accountBookStore);

  // 이벤트 리스너 설정
  setupMainEventListeners(
    elements,
    updateAmountSign,
    setupAmountInputListeners,
    setupContentInputListeners,
    updateHeaderDate,
    validateFormData,
    processAmountSign,
    createNewItem,
    deleteItem
  );

  // 최초 렌더링
  initializeRendering(accountBookStore, updateHeaderDate, updateInputDate);

  // 모달 초기화
  initializeModal(initModal);
}

window.initMain = initMain;
