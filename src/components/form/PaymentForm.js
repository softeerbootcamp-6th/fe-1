import { ElementManager } from "../../utils/ElementManager.js";
import { DropDown } from "./DropDown.js";

const defaultPayment = ["현금", "신용카드"];
export const PaymentForm = (input) => {
  let isPaymentOpen = false;
  const paymentForm = ElementManager.renderElement("div", "form-payment");
  paymentForm.innerHTML = `
  <label for="payment" class="light-12">결제수단</label>
  <button id="payment">
    <span class="semibold-12">선택하세요</span>
    <img width="16px" src="./src/assets/chevron-down.png" alt="arrow"/>
  </button>
  `;

  const paymentImg = paymentForm.querySelector("#payment > img");
  paymentImg.addEventListener("click", (e) => {
    // 이미지 업데이트
    isPaymentOpen = !isPaymentOpen;
    paymentImg.src = `./src/assets/chevron-${
      isPaymentOpen ? "up" : "down"
    }.png`;

    // 드롭다운 화면에 표시/제거
    if (isPaymentOpen) {
      paymentForm.appendChild(DropDown("payment", defaultPayment));
    } else {
      const dropDown = paymentForm.querySelector(".drop-down");
      paymentForm.removeChild(dropDown);
    }
  });
  return paymentForm;
};
