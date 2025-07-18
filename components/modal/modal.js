export function createModal(
  container,
  {
    message = "",
    input = false,
    inputPlaceholder = "",
    cancelText = "취소",
    confirmText = "확인",
  } = {}
) {
  container.innerHTML = `
    <dialog class="modal-container">
      <form method="dialog" class="modal">
        <label class="modal-content light-16">
          <div>${message}</div>
          ${
            input
              ? `<input name="modalInput" type="text" placeholder="${inputPlaceholder}" />`
              : ""
          }
        </label>
        <div class="modal-btn-container flex-between semibold-16">
          <button type="button" class="cancel-btn modal-btn">${cancelText}</button>
          <button type="button" class="confirm-btn modal-btn">${confirmText}</button>
        </div>
      </form>
    </dialog>
  `;
}

export function openModal(modal) {
  modal.showModal();
}

export function closeModal(modal) {
  modal.close();
}

export function renderModal(container) {
  createModal(container, {
    message: "추가하실 결제 수단을 적어주세요.",
    input: true,
    inputPlaceholder: "결제 수단을 입력해주세요.",
    cancelText: "취소",
    confirmText: "추가",
  });
}

export function initModal(
  container,
  { onCancel = () => {}, onConfirm = (value) => {} } = {}
) {
  const modal = container.querySelector(".modal-container");
  const input = modal.querySelector('input[name="modalInput"]');
  const cancelBtn = modal.querySelector(".cancel-btn");
  const confirmBtn = modal.querySelector(".confirm-btn");

  cancelBtn.addEventListener("click", () => {
    onCancel();
    modal.close();
  });

  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-container")) {
      onCancel();
      modal.close();
    }
  });

  confirmBtn.addEventListener("click", () => {
    const value = input ? input.value.trim() : undefined;
    onConfirm(value);
    modal.close();
  });
}
