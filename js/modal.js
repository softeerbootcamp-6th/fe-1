export const showModal = (onConfirm) => {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-box">
        <h2 class="modal-title">추가하실 결제 수단을 입력해주세요.</h2>

        <input
                type="text"
                class="modal-input"
                placeholder="placeholder"
                aria-label="새 결제수단 입력"
                />

        <div class="modal-actions">
          <button class="modal-btn cancel">취소</button>
          <button class="modal-btn confirm">추가</button>
        </div>

      </div>
    </div>`;
  document.body.appendChild(overlay);

  // 모달이 아닌 영역을 클릭하면 모달을 닫음
  overlay.onclick = e => {
    if (e.target === overlay) overlay.remove();
  };

  // 취소 버튼 클릭 시 모달을 닫음
  overlay.querySelector('.cancel').onclick = () => overlay.remove();

  // 확인 버튼 클릭 시
  overlay.querySelector('.confirm').onclick = () => {
    // v에 입력된 값을 공백을 제거한 후 가져옴
    const v = overlay.querySelector('.modal-input').value.trim();
    // 입력값이 비어있지 않으면 onConfirm 콜백을 호출
    if (v) onConfirm(v);
    // 모달을 닫음
    overlay.remove();
  };
};