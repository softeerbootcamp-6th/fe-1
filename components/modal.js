export function createModal({
  title,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
  children,
}) {
  const modalContainer = document.createElement("div");
  modalContainer.id = "modal";
  modalContainer.className = "modal";
  modalContainer.innerHTML = `
        <div class="modal-content">
            <h3>${title}</h3>
            ${children || ""}
            <button id="confirm-btn" class="confirm-btn">${confirmText}</button>
            <button id="cancel-btn" class="cancel-btn">${cancelText}</button>
        </div>
    `;

  const confirmButton = modalContainer.querySelector("#confirm-btn");
  const cancelButton = modalContainer.querySelector("#cancel-btn");

  confirmButton.addEventListener("click", () => {
    if (onConfirm) {
      onConfirm();
    }
    modalContainer.remove();
  });

  cancelButton.addEventListener("click", () => {
    if (onCancel) {
      onCancel();
    }
    modalContainer.remove();
  });

  document.body.appendChild(modalContainer);
}
