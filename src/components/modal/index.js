import { ElementManager } from "../../utils/ElementManager.js";
import { EventDispatcher } from "../../utils/EventDispatcher.js";

const COMMENT_TYPE = (option) => {
  return {
    add: {
      label: "추가하실 결제 수단을 입력해주세요",
      button: "추가",
      element:
        '<input class="semibold-12" id="modal-input" placeholder="placehoder" />',
    },
    deletePayment: {
      label: "해당 결제 수단을 삭제하시겠습니까?",
      button: "삭제",
      element:
        '<input class="semibold-12" id="modal-input" placeholder="placehoder" />',
    },
    deleteListItem: {
      label: "해당 내역을 삭제하시겠습니까?",
      button: "삭제",
      element: `<div class="content light-12">
        <span>카테고리: ${option.category}</span>
        <span>내용: ${option.content}</span>
        <span>결제수단: ${option.payment}</span>
        <span>금액: ${option.money}</span>
      </div>`,
    },
  };
};

export const Modal = {
  renderModal: (type, confimAction, option = "") => {
    const modal = ElementManager.renderElementId("div", "modal");
    modal.innerHTML = `
    <div class="modal-wrapper">
      <div class="input-container">
        <label class="light-16" for="modal-input">${
          COMMENT_TYPE(option)[type].label
        }</label>
        ${COMMENT_TYPE(option)[type].element}
      </div>
      <div class="button-container">
        <button class="cancel semibold-16">취소</button>
        <button class="confirm semibold-16">${
          COMMENT_TYPE(option)[type].button
        }</button>
      </div>
    </div>
    `;
    document.body.appendChild(modal);

    EventDispatcher.register({
      eventType: "click",
      selector: "button-container",
      handler: (e) => {
        if (e.target.closest(".cancel")) {
          Modal.hideModal();
        }
        if (e.target.closest(".confirm")) {
          if (type === "deletePayment") {
            const modalInput = modal.querySelector(".input-container > input");
            confimAction(modalInput.value);
          } else {
            confimAction();
          }
          Modal.hideModal();
        }
      },
    });
  },
  hideModal: () => {
    const modal = document.body.querySelector("#modal");
    document.body.removeChild(modal);
  },
};
