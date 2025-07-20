// 분리된 모듈들에서 함수들을 import
import {
  setupToggleListeners,
  setupDateInputListeners,
  setupAmountInputListeners,
  setupContentInputListeners,
  setupAddButtonListeners,
  enterEditMode,
  cancelEditMode,
} from "../components/input/input-handlers.js";

import {
  setupCustomDropdowns,
  closeAllDropdowns,
  selectDropdownOption,
  updatePaymentMethodOptions,
  handleAddPaymentMethod,
  handleDeletePaymentMethod,
} from "../components/dropdown/dropdown-handlers.js";

import {
  setupRealtimeValidation,
  updateFormValidation,
  getDropdownValue,
  setDropdownValue,
  updateSubmitButtonState,
  validateFormRealtime,
  getPaymentMethods,
  setPaymentMethods,
} from "./form-utils.js";

import {
  initializeRendering,
  updateHistoryList,
  renderHistoryListWithFilter,
  renderHistoryList,
  setupHistoryItemListeners,
  setupDeleteButtonListeners,
} from "../components/history/history-handlers.js";

// 모든 함수들을 분리된 모듈에서 한 번 더 export
// import 해올 때 깔-끔하게 가져오기 위해
export {
  // Input handlers
  setupToggleListeners,
  setupDateInputListeners,
  setupAmountInputListeners,
  setupContentInputListeners,
  setupAddButtonListeners,
  enterEditMode,
  cancelEditMode,

  // Dropdown handlers
  setupCustomDropdowns,
  closeAllDropdowns,
  selectDropdownOption,
  updatePaymentMethodOptions,
  handleAddPaymentMethod,
  handleDeletePaymentMethod,

  // Form utilities
  setupRealtimeValidation,
  updateFormValidation,
  getDropdownValue,
  setDropdownValue,
  updateSubmitButtonState,
  validateFormRealtime,
  getPaymentMethods,
  setPaymentMethods,

  // History handlers
  initializeRendering,
  updateHistoryList,
  renderHistoryListWithFilter,
  renderHistoryList,
  setupHistoryItemListeners,
  setupDeleteButtonListeners,
};
