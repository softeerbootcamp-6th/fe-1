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

/*
 <div id="delete-modal" class="delete-modal delete-hidden">
            <div class="delete-modal-content">
                <h3>삭제하시겠습니까?</h3>
                <button id="confirm-delete" class="confirm-delete">삭제</button>
                <button id="cancel-delete" class="cancel-delete">취소</button>
            </div>
        </div>
*/
