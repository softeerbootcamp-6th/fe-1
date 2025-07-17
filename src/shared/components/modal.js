const closeModal = (overlay) => overlay.remove();

const addEventListenerToCancel = (overlay) => {
  // 모달의 취소 버튼 클릭 시 모달을 닫음
  overlay
    .querySelector('.cancel')
    .addEventListener('click', () => closeModal(overlay));
};

const callOnConfirm = ({ onConfirm, value }) => {
  if (!value) return;
  // 입력값이 비어있지 않으면 onConfirm 함수 호출
  onConfirm(value);
};

const getInputValue = (overlay) => {
  // 입력 필드의 값을 가져와 공백을 제거
  const input = overlay.querySelector('.modal-input');
  return input.value.trim();
};

const addEventListenerToConfirm = (overlay, onConfirm) => {
  // 모달의 추가 버튼 클릭 시
  overlay.querySelector('.confirm').addEventListener('click', () => {
    const value = getInputValue(overlay);
    callOnConfirm({ onConfirm, value });
    closeModal(overlay);
  });
};

const addEventListeners = (overlay, onConfirm) => {
  addEventListenerToCancel(overlay);
  addEventListenerToConfirm(overlay, onConfirm);
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

  addEventListeners(overlay, onConfirm);
};
