import {
  renderMethodDropdown,
  renderCategoryDropdown,
} from "../dropdown/dropdown-rendering.js";

export function renderInputForm() {
  return `
    <!-- 가계부 입력 폼 -->
    <div class="input-row-wrapper">
    <div class="input-row">
        <div class="input-cell date">
        <span>일자</span>
        <div class="input-cell-content-wrapper">
        <button class="date-btn" onClick="document.getElementById('dateInput').showPicker()">
          <input type="date" class="date-input" id="dateInput" />
        </button>
        </div>
        </div>
        <div class="input-cell amount">
        <span>금액</span>
        <div class="input-cell-content-wrapper">
            <div class="toggle-btn">
            <img
                src="assets/icons/minus.svg"
                alt="minus"
                class="toggle-icon active"
                data-type="minus"
            />
            <img
                src="assets/icons/plus.svg"
                alt="plus"
                class="toggle-icon"
                data-type="plus"
            />
            </div>
            <input type="number" class="amount-input" placeholder="예: 15000" />
            <span>원</span>
        </div>
        </div>
        <div class="input-cell content">
        <div class="input-cell-content-wrapper stretch">
            <span>내용</span>
            <span class="char-count">0/32</span>
        </div>
        <div class="input-cell-content-wrapper">
            <input type="text" placeholder="입력하세요" maxlength="32" />
        </div>
        </div>
        <div class="input-cell method">
        <span>결제 수단</span>
        <div class="input-cell-content-wrapper">
            ${renderMethodDropdown()}
        </div>
        </div>
        <div class="input-cell category">
        <span>분류</span>
        <div class="input-cell-content-wrapper">
            ${renderCategoryDropdown()}
        </div>
        </div>
        <div class="input-cell submit">
        <button class="circle-btn">
          <img src="assets/icons/unchecked.svg" width="40" height="40" alt="비활성화된 체크" />
        </button>
        </div>
    </div>
    </div>
  `;
}
