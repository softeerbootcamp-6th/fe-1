export const showModal = (onConfirm) => {
  const overlay = document.createElement('div');

  overlay.className = 'modal-overlay';

  overlay.innerHTML = `
    <div class="modal"><div class="modal-box">
      <h2 class="modal-title">추가하실 결제 수단을 입력해주세요.</h2>
      <input type="text" class="modal-input" aria-label="새 결제수단 입력" />
      <div class="modal-actions"><button class="modal-btn cancel">취소</button><button class="modal-btn confirm">추가</button></div>
    </div></div>`;

  document.body.appendChild(overlay);

  // 오버레이를 닫는 함수
  const close = () => overlay.remove();
  // 모달의 입력 필드
  const input = overlay.querySelector('.modal-input');

  // 취소 버튼 클릭 시 모달을 닫음
  overlay.querySelector('.cancel').onclick = close;
  // 추가 버튼 클릭 시
  overlay.querySelector('.confirm').onclick = () => {
    // 입력 필드의 값을 가져와 공백을 제거
    const v = input.value.trim();
    // 입력값이 비어있지 않으면 onConfirm 함수 호출
    if (v) onConfirm(v);
    close();
  };
};