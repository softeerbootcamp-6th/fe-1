import { EventDispatcher } from "../../utils/EventDispatcher.js";
import { ElementManager } from "../../utils/ElementManager.js";
import { Modal } from "../modal/index.js";
import { DropDown } from "./DropDown.js";
import { formStore } from "../../store/FormStore.js";

let defaultPayment = ["현금", "신용카드"];
export const PaymentForm = () => {
  let isPaymentOpen = false;
  const paymentForm = ElementManager.renderElement("div", "form-payment");
  paymentForm.innerHTML = `
  <label for="payment" class="light-12">결제수단</label>
  <div class="form-input-wrapper">
    <input type="text" id="payment" name="payment" placeholder="선택하세요" value="${formStore.data.payment}" readonly class="semibold-12" />
    <img width="16px" src="./src/assets/chevron-down.png" alt="arrow"/>
  </div>
  `;

  const paymentTextInput = paymentForm.querySelector("#payment");
  const paymentImg = paymentForm.querySelector(".form-input-wrapper > img");

  formStore.subscribe((newData) => {
    paymentTextInput.value = newData.payment;
  });

  EventDispatcher.register({
    eventType: "click",
    selector: "form-payment",
    handler: ({ target }) => {
      const dropDownLi = target.closest(".drop-down-li");

      // 드롭다운 선택시
      if (dropDownLi) {
        const selectedPayment = target.innerText;
        formStore.dispatch("update", { payment: selectedPayment });
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

      // 드롭다운 열기/닫기
      isPaymentOpen = !isPaymentOpen;
      paymentImg.src = `./src/assets/chevron-${
        isPaymentOpen ? "up" : "down"
      }.png`;

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
