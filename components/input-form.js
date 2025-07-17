export default function createInputForm() {
  const inputForm = document.createElement("div");
  inputForm.className = "input-form";
  inputForm.innerHTML = `
      <div class="inter-input-block">
    <div>일자</div>
    <input type="date" id="date" class="date" />
  </div>

  <div class="vertical-line"></div>

  <div class="inter-input-block">
    <div>금액</div>
    <div class="amount-block">
      <div class="toggle-sign" id="toggle-sign">+</div>
      <input type="text" id="amount" placeholder="0" />
      <div>원</div>
    </div>
  </div>

  <div class="vertical-line"></div>

  <div class="inter-input-block">
    <div class="desc-header">
      <div>내용</div>
      <div class="char-count" id="char-count">0 / 32</div>
    </div>
    <input
      type="text"
      id="desc"
      class="content"
      placeholder="입력하세요"
      maxlength="32"
    />
  </div>

  <div class="vertical-line"></div>

  <div class="inter-input-block" id="method-wrapper">
    <div class="method">결제수단</div>
    <div class="dropdown-display" id="dropdown-display">선택하세요</div>
    <div class="dropdown-panel hidden" id="dropdown-panel">
      <div class="dropdown-add" id="dropdown-add">추가하기</div>
    </div>
  </div>

  <div class="vertical-line"></div>

  <div class="inter-input-block" id="category-wrapper">
    <div>분류</div>
    <div class="dropdown-display" id="category-display">선택하세요</div>
    <div class="dropdown-panel hidden" id="category-panel">
    </div>
  </div>

  <button id="add-btn">
    <img src="../assets/icons/check.svg" alt="확인" />
  </button>
  `;

  return inputForm;
}
