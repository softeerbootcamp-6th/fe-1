import {
  updateAmountSign,
  setupAmountInputListeners,
  setupContentInputListeners,
} from "../../utils/format-utils.js";
import { updateHeaderDate, updateInputDate } from "../../utils/date-utils.js";
import {
  setupGlobalVariables,
  setupGlobalFunctions,
  setupToggleListeners,
  setupDateInputListeners,
  setupAddButtonListeners,
  setupRealtimeValidation,
  setupCustomDropdowns,
  initializeRendering,
  initializeModal,
} from "./main-ui-utils.js";
import { initModal } from "../../layouts/modal/modal.js";
import {
  deleteItem,
  onMonthChanged,
  getFilteredData,
} from "../../utils/data-utils.js";

function initMain() {
  // 전역 변수들을 window 객체에 등록
  setupGlobalVariables();

  // 전역 함수들을 window 객체에 등록
  setupGlobalFunctions(
    deleteItem,
    updateHeaderDate,
    updateInputDate,
    getFilteredData,
    onMonthChanged
  );

  // 각각의 이벤트 리스너 설정
  setupToggleListeners();
  setupDateInputListeners();
  setupAmountInputListeners();
  setupContentInputListeners();
  setupAddButtonListeners();
  setupRealtimeValidation();
  setupCustomDropdowns();

  // 최초 렌더링
  initializeRendering(updateHeaderDate, updateInputDate);

  // 모달 초기화
  initializeModal(initModal);
}

window.initMain = initMain;
