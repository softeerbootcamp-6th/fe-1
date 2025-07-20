import { renderModal } from "./modal-rendering.js";

// 모달 초기화 함수
export function initModal() {
  // 모달 HTML 렌더링
  renderModal();

  // 모달 이벤트 리스너 설정
  setupModalListeners();
}

// 모달 표시 함수
export function showModal(
  title,
  placeholder = "",
  onConfirm,
  message = "",
  isDelete = false
) {
  const backdrop = document.getElementById("modal-backdrop");
  const modalContent = backdrop.querySelector(".modal-content");
  const modalTitle = document.getElementById("modal-title");
  const input = document.getElementById("modal-input");
  const messageEl = document.getElementById("modal-message");
  const confirmBtn = document.getElementById("modal-confirm-btn");
  const milliSecond = 100;

  // 삭제일 경우에는 삭제용 모달 스타일 적용
  if (isDelete) {
    modalContent.classList.add("delete-modal");
    confirmBtn.textContent = "삭제";
  } else {
    modalContent.classList.remove("delete-modal");
    confirmBtn.textContent = "확인";
  }

  // 모달 내용 설정
  modalTitle.textContent = title;

  // 메시지가 있으면 메시지를 보여주고 입력창은 숨김 (ex.삭제 모달일 경우 메시지만 보여줌)
  if (message) {
    messageEl.textContent = message;
    messageEl.style.display = "block";
    input.style.display = "none";
  } else {
    input.placeholder = placeholder;
    input.value = "";
    input.style.display = "block";
    messageEl.style.display = "none";

    // 입력 필드에 포커스
    setTimeout(() => {
      input.focus();
    }, milliSecond);
  }

  // 모달 표시
  backdrop.classList.add("show");

  // 기존 이벤트 리스너 제거
  const newConfirmBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

  // 확인 버튼 이벤트 리스너
  newConfirmBtn.addEventListener("click", () => {
    if (message || input.value.trim()) {
      onConfirm(input.value?.trim());
      hideModal();
    }
  });

  // 엔터 키 이벤트 리스너
  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      if (message || input.value.trim()) {
        onConfirm(input.value?.trim());
        hideModal();
      }
    }
  };

  input.addEventListener("keypress", handleEnterKey);

  // 모달이 숨겨질 때 이벤트 리스너 제거
  backdrop.addEventListener("transitionend", function cleanup() {
    if (!backdrop.classList.contains("show")) {
      input.removeEventListener("keypress", handleEnterKey);
      backdrop.removeEventListener("transitionend", cleanup);
    }
  });
}

// 모달 숨기기 함수
export function hideModal() {
  const backdrop = document.getElementById("modal-backdrop");
  backdrop.classList.remove("show");
}

// 모달 이벤트 리스너 설정 함수
export function setupModalListeners() {
  const backdrop = document.getElementById("modal-backdrop");
  const cancelBtn = document.getElementById("modal-cancel-btn");

  // 취소 버튼 클릭 시 모달 닫기
  cancelBtn.addEventListener("click", hideModal);

  // 백드롭 클릭 시 모달 닫기
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) {
      hideModal();
    }
  });

  // ESC 키로 모달 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("show")) {
      hideModal();
    }
  });
}
