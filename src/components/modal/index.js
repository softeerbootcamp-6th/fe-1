import { ElementManager } from "../../utils/ElementManager.js";

const COMMENT_TYPE = {
  add: {
    label: "추가하실 결제 수단을 입력해주세요",
    button: "추가",
  },
  delete: {
    label: "해당 결제 수단을 삭제하시겠습니까?",
    button: "삭제",
  },
};

export const Modal = {
  renderModal: (type, confimAction) => {
    const modal = ElementManager.renderElementId("div", "modal");
    modal.innerHTML = `
    <div class="modal-wrapper">
      <div class="input-container">
        <label class="light-16" for="modal-input">${COMMENT_TYPE[type].label}</label>
        <input class="semibold-12" id="modal-input" placeholder="placehoder"/>
      </div>
      <div class="button-container">
        <button class="cancel semibold-16">취소</button>
        <button class="confirm semibold-16">${COMMENT_TYPE[type].button}</button>
      </div>
    </div>
    `;
    document.body.appendChild(modal);

    const buttonContainer = modal.querySelector(".button-container");
    const modalInput = modal.querySelector(".input-container > input");
    buttonContainer.addEventListener("click", (e) => {
      if (e.target.closest(".cancel")) {
        Modal.hideModal();
      }
      if (e.target.closest(".confirm")) {
        confimAction(modalInput.value);
        Modal.hideModal();
      }
    });
  },
  hideModal: () => {
    const modal = document.body.querySelector("#modal");
    document.body.removeChild(modal);
  },
};
