import { initCategoryListener } from "./category.js";
import { initDescriptionListener } from "./description.js";
import { initAmountListener } from "./amount.js";
import { initToggleSignListener } from "./toggleSign.js";
import { initPaymentMethodListener } from "./paymentMethod.js";

//리스너 등록
function initTotalListener() {
  initCategoryListener();
  initDescriptionListener();
  initAmountListener();
  initToggleSignListener();
  initPaymentMethodListener();
}

// 이벤트 위임 방식으로 처리하면 좋아 보임
export function initInputFormListener() {
  initTotalListener();
}
