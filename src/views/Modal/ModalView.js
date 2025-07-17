const BUTTON_TEXT = {
  add: "추가",
  delete: "삭제",
};

class ModalView {
  constructor() {
    this.$root = document.getElementById("modal");
  }

  init() {
    const template = `
          <dialog class="modal">
              <div class="modal__container">
                  <div class="modal__main">
                  <h3 class="modal__title font-light-16"></h3>
                  <div class="modal__content"></div>
                  </div>
                  <div class="modal__buttons">
                  <button
                      type="button"
                      class="modal__button modal__button--cancel font-semibold-16"
                  >
                      취소
                  </button>
                  <button
                      type="button"
                      class="modal__button modal__button--confirm font-semibold-16 modal__button--add"
                  >
                  </button>
                  </div>
              </div>
          </dialog>
      `;

    this.$root.innerHTML = template;

    const modal = this.$root.querySelector("dialog.modal");
    modal.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      // 백드롭 클릭 시 모달 닫기
      if (e.target === modal) {
        modal.close();
        return;
      }

      if (e.target.classList.contains("modal__button--cancel")) {
        modal.close();
        return;
      }
    });
  }

  open(state) {
    const { type, title, content, onConfirm } = state;
    const modal = this.$root.querySelector("dialog.modal");
    const confirmButton = this.$root.querySelector(".modal__button--confirm");

    this.$root.querySelector(".modal__title").textContent = title;
    this.$root.querySelector(".modal__content").innerHTML = content;
    confirmButton.classList.add(`modal__button--${type}`);
    confirmButton.textContent = BUTTON_TEXT[type];
    confirmButton.removeEventListener("click", onConfirm);
    confirmButton.addEventListener("click", onConfirm);

    modal.showModal();
  }

  close() {
    const modal = this.$root.querySelector("dialog.modal");
    modal.close();
  }
}

export default ModalView;
