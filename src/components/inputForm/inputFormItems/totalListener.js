import { initCategoryListener } from "./category.js";
import { initDescriptionListener } from "./description.js";
import { initAmountListener } from "./amount.js";
import { initToggleSignListener } from "./toggleSign.js";
import { initPaymentMethodListener } from "./paymentMethod.js";

/* 
  inputform관련 컴포넌트들의 리스너를 등록하는 파일의 기능
*/
function initTotalListener() {
  initCategoryListener();
  initDescriptionListener();
  initAmountListener();
  initToggleSignListener();
  initPaymentMethodListener();
}

export function initInputFormListener() {
  initTotalListener();
}
