import { TextInput } from "../index.js";

/**
 * Modal 컴포넌트
 *
 * // 기본 사용법
 * const modal = Modal({
 *   className: 'modal--add-category',
 *   text: '카테고리 추가',
 *   placeholder: '카테고리 이름',
 *   onConfirm: (value) => {
 *     alert(value);
 *   },
 * });
 *
 * document.body.appendChild(modal);
 * document
 *   .querySelector(".show-modal-button")
 *   .addEventListener("click", () => {
 *     modal.showModal();
 *   });
 */

const Modal = ({
  className = null,
  text = null,
  placeholder = null,
  onConfirm = null,
} = {}) => {
  const modal = document.createElement("dialog");
  modal.className = `modal ${className}`;

  // 백드롭 클릭 시 모달 닫기
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.close();
    }
  });

  const modalContainer = document.createElement("div");
  modalContainer.className = "modal__container";

  const modalContent = document.createElement("div");
  modalContent.className = "modal__content";

  const modalLabel = document.createElement("span");
  modalLabel.className = "modal__label font-light-16";
  modalLabel.textContent = text;

  const modalInput = TextInput({
    type: "default",
    state: "enabled",
    placeholder: placeholder,
  });

  modalContent.append(modalLabel, modalInput);

  const modalButtons = document.createElement("div");
  modalButtons.className = "modal__buttons";

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.className =
    "modal__button modal__button--cancel font-semibold-16";
  cancelButton.textContent = "취소";

  cancelButton.addEventListener("click", () => {
    modal.close();
  });

  const confirmButton = document.createElement("button");
  confirmButton.type = "button";
  confirmButton.className =
    "modal__button modal__button--confirm font-semibold-16";
  confirmButton.textContent = "추가";

  confirmButton.addEventListener("click", () => {
    onConfirm(modalInput.value);
    modalInput.value = "";
    modal.close();
  });

  modalButtons.append(cancelButton, confirmButton);
  modalContainer.append(modalContent, modalButtons);

  modal.append(modalContainer);

  return modal;
};

export default Modal;
