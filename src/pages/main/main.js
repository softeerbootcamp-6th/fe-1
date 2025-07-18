import {
  setupAmountInputListeners,
  setupContentInputListeners,
} from "../../utils/format-utils.js";
import {
  setupToggleListeners,
  setupDateInputListeners,
  setupAddButtonListeners,
  setupRealtimeValidation,
  setupCustomDropdowns,
  initializeRendering,
} from "./utils/main-ui-utils.js";
import { initModal } from "../../layouts/modal/modal.js";

export function initMain() {
  // 각각의 이벤트 리스너 설정
  setupToggleListeners();
  setupDateInputListeners();
  setupAmountInputListeners();
  setupContentInputListeners();
  setupAddButtonListeners();
  setupRealtimeValidation();
  setupCustomDropdowns();

  // 최초 렌더링
  initializeRendering();

  // 모달 초기화
  initModal();
}
