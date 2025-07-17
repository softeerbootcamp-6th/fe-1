import { renderModal } from "./modal-rendering.js";

// 모달 초기화 함수
export function initModal() {
  // 모달 HTML 렌더링
  renderModal();

  // 모달 이벤트 리스너 설정
  setupModalListeners();
}

// 모달 표시 함수
export function showModal(title, placeholder, onConfirm) {
  const backdrop = document.getElementById("modal-backdrop");
  const input = document.getElementById("modal-input");
  const confirmBtn = document.getElementById("modal-confirm-btn");
  const milliSecond = 100;
  // 모달 내용 설정
  input.placeholder = placeholder;
  input.value = "";

  // 모달 표시
  backdrop.classList.add("show");

  // 입력 필드에 포커스
  setTimeout(() => {
    input.focus();
  }, milliSecond);

  // 기존 이벤트 리스너 제거
  const newConfirmBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

  // 확인 버튼 이벤트 리스너
  newConfirmBtn.addEventListener("click", () => {
    const inputValue = input.value.trim();
    if (inputValue) {
      onConfirm(inputValue);
      hideModal();
    }
  });

  // 엔터 키 이벤트 리스너
  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      const inputValue = input.value.trim();
      if (inputValue) {
        onConfirm(inputValue);
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
