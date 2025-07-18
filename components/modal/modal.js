export function createModal(container) {
  const modal = document.createElement("div");
  modal.innerHTML = `
    <dialog class="modal">
        <form method="dialog">
            <p>
            <label>
                좋아하는 동물:
                <input type="text" required />
            </label>
            </p>
            <div>
            <input type="submit" id="normal-close" value="일반 닫기" />
            <input
                type="submit"
                id="novalidate-close"
                value="검증 없이 닫기"
                formnovalidate />
            <input type="submit" id="js-close" value="JS 닫기" />
            </div>
        </form>
    </dialog>
  `;
  container.appendChild(modal);
}

export function openModal(modal) {
  modal.showModal();
}

export function closeModal(modal) {
  modal.close();
}

export function renderModal(container) {
  createModal(container);
}
export function initModal(container) {
  const modal = container.querySelector(".modal");
  modal.addEventListener("click", (e) => {
    if (e.target.id === "normal-close") {
      closeModal(modal);
    }
  });
}
