// 모달 HTML 렌더링 함수
export function renderModal() {
  const modalContainer = document.getElementById("modal-container");

  modalContainer.innerHTML = `
    <div class="modal-backdrop" id="modal-backdrop">
      <div class="modal-content">
        <div class="modal-body">
          <div class="modal-input-group">
            <label for="modal-input" class="modal-label">추가하실 결제 수단을 입력하세요</label>
            <input 
              type="text" 
              id="modal-input" 
              class="modal-input"
              placeholder="placeholder"
              maxlength="20"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button class="modal-btn modal-btn-cancel" id="modal-cancel-btn">취소</button>
          <button class="modal-btn modal-btn-confirm" id="modal-confirm-btn">추가</button>
        </div>
      </div>
    </div>
  `;
}
