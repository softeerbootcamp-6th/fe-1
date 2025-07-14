const modal = document.getElementById("modal-root");
const modalTitle = document.getElementById("modal-title");
const modalContent = document.getElementById("modal-content");
const modalCancel = document.getElementById("modal-cancel");
const modalFeature = document.getElementById("modal-feature");

export const openModal = ({title, content, isDelete, onClick}) => {
    modalTitle.textContent = title;
    modalContent.innerHTML = content;
    if (isDelete === true) {
        modalFeature.innerText = "삭제";
        modalFeature.style.color = "var(--danger-text-default)";
    } else {
        modalFeature.innerText = "추가";
        modalFeature.style.color = "var(--nuetral-text-default)";
    }
    modalCancel.addEventListener("click", closeModal);
    modalFeature.onclick = () => {
        onClick();
        closeModal();
    };
    modal.classList.remove("hidden");
};
export const closeModal = () => {
    modal.classList.add("hidden");
};