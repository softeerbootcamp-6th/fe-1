// 모달 렌더링 함수
export function renderModal() {
  const modalHTML = `
    <div id="modal-backdrop" class="modal-backdrop">
      <div class="modal-content">
        <h2 id="modal-title" class="modal-title">제목</h2>
        <div id="modal-body" class="modal-body">
          <input
            type="text"
            id="modal-input"
            class="modal-input"
            placeholder="입력해주세요"
          />
          <p id="modal-message" class="modal-message" style="display: none;"></p>
        </div>
        <div class="modal-footer">
          <button id="modal-cancel-btn" class="modal-btn cancel-btn">취소</button>
          <button id="modal-confirm-btn" class="modal-btn confirm-btn">확인</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);
}
