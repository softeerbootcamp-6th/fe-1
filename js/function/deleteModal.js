export function deleteModal() {
    const deleteModal = document.querySelector(".delete-modal");
    const deleteConfirmBtn = document.querySelector(".confirm-delete");
    const deleteCancelBtn = document.querySelector(".cancel-delete");

    const deleteBtn = document.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", () => {
        deleteModal.classList.remove("hidden");
    });

    deleteConfirmBtn.addEventListener("click", () => {
        // 삭제 로직을 여기에 추가
        // 예: 서버에 삭제 요청 보내기
        console.log("삭제가 완료되었습니다.");
        deleteModal.classList.add("hidden");
    });
}