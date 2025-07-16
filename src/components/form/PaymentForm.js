import { EventDispatcher } from "../../utils/EventDispatcher.js";
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
    <span class="semibold-12">${input.payment}</span>
    <img width="16px" src="./src/assets/chevron-down.png" alt="arrow"/>
  </button>
  `;

  const paymentImg = paymentForm.querySelector("#payment > img");
  EventDispatcher.register({
    eventType: "click",
    selector: "form-payment",
    handler: ({ target }) => {
      // 값 선택 업데이트+화면에 표시
      const dropDownLi = target.closest(".drop-down-li");
      if (dropDownLi) {
        const selectedPayment = target.innerText;
        input.payment = selectedPayment;
        const paymentTextInput = paymentForm.querySelector("#payment > span");
        paymentTextInput.textContent = selectedPayment;
      }

      // 값 추가
      const addButton = target.closest(".add-button");
      if (addButton) {
        Modal.renderModal("add", (newPayment) => {
          defaultPayment.push(newPayment);
        });
      }

      // 값 삭제
      const deleteButton = target.closest(".delete-button");
      if (deleteButton) {
        Modal.renderModal("delete", (isConfirm) => {
          const selectedLi = target.closest("li");
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
        paymentForm.appendChild(
          DropDown({ type: "payment", data: defaultPayment })
        );
      } else {
        const dropDown = paymentForm.querySelector(".drop-down");
        paymentForm.removeChild(dropDown);
      }
    },
  });
  return paymentForm;
};
