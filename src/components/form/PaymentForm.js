import { EventDispatcher } from "../../store/EventBusStore.js";
import { ElementManager } from "../../utils/ElementManager.js";
import { Modal } from "../modal/index.js";
import { DropDown } from "./DropDown.js";

let defaultPayment = ["현금", "신용카드"];
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
  EventDispatcher.register({
    eventType: "click",
    selector: "form-payment",
    handler: (e) => {
      // 값 선택 업데이트+화면에 표시
      if (e.target.closest(".drop-down-li")) {
        const selectedPayment = e.target.innerText;
        input.payment = selectedPayment;
        const paymentTextInput = paymentForm.querySelector("#payment > span");
        paymentTextInput.textContent = selectedPayment;

        const event = new Event("input", {
          bubbles: true, // 이벤트 버블링을 허용 -> entireForm까지 도달
          cancelable: false,
        });
        paymentTextInput.dispatchEvent(event);
      }

      // 값 추가
      if (e.target.closest(".add-button")) {
        Modal.renderModal("add", (newPayment) => {
          defaultPayment.push(newPayment);
        });
      }

      // 값 삭제
      if (e.target.closest(".delete-button")) {
        Modal.renderModal("delete", (isConfirm) => {
          const selectedLi = e.target.closest("li");
          const selectedSpan = selectedLi.querySelector(".drop-down-li");
          defaultPayment = defaultPayment.filter(
            (item) => item !== selectedSpan.textContent
          );
        });
      }

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
    },
  });
  return paymentForm;
};
