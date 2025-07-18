const closeModal = ({ overlay }) => overlay.remove();

const callOnConfirm = ({ onConfirm, value }) => {
  if (!value) return;
  // 입력값이 비어있지 않으면 onConfirm 함수 호출
  onConfirm(value);
};

const getInputValue = ({ overlay }) => {
  // 입력 필드의 값을 가져와 공백을 제거
  const input = overlay.querySelector('.modal-input');
  return input.value.trim();
};

// 이벤트 위임을 적용한 단일 이벤트 핸들러
const handleModalClick = ({ event, overlay, onConfirm }) => {
  // 취소 버튼 클릭 처리
  const cancelButton = event.target.closest('.cancel');
  if (cancelButton) {
    closeModal({ overlay });
    return;
  }

  // 확인 버튼 클릭 처리
  const confirmButton = event.target.closest('.confirm');
  if (!confirmButton) return;
  const value = getInputValue({ overlay });
  callOnConfirm({ onConfirm, value });
  closeModal({ overlay });
};

// 이벤트 위임을 적용한 이벤트 리스너 추가
const addEventListeners = ({ overlay, onConfirm }) => {
  overlay.addEventListener('click', (event) => {
    handleModalClick({ event, overlay, onConfirm });
  });
};

const modalHTML = () => {
  return `
    <div class="modal">
      <div class="modal-box">
        <h2 class="modal-title">추가하실 결제 수단을 입력해주세요.</h2>
        <input type="text" class="modal-input" aria-label="새 결제수단 입력" />
        <div class="modal-actions">
          <button class="modal-btn cancel">취소</button>
          <button class="modal-btn confirm">추가</button>
        </div>
      </div>
    </div>
  `;
};

export const showModal = (onConfirm) => {
  const overlay = document.createElement('div');

  overlay.className = 'modal-overlay';

  overlay.innerHTML = modalHTML();

  document.body.appendChild(overlay);

  addEventListeners({ overlay, onConfirm });
};
