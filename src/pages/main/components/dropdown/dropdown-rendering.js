export function renderMethodDropdown() {
  return `
    <div class="custom-dropdown" data-type="method">
      <div class="dropdown-selected">
        <span class="selected-text">선택하세요</span>
        <img src="assets/icons/chevron-down.svg" alt="dropdown" class="dropdown-arrow" />
      </div>
      <div class="dropdown-options">
        <div class="dropdown-option" data-value="">
          <span>선택하세요</span>
        </div>
        <div class="dropdown-option" data-value="현금">
          <span>현금</span>
        </div>
        <div class="dropdown-option" data-value="신용카드">
          <span>신용카드</span>
        </div>
        <div class="dropdown-option add-option">
          <img src="assets/icons/plus.svg" alt="add" class="add-icon" />
          <span>추가하기</span>
        </div>
      </div>
    </div>
  `;
}

export function renderCategoryDropdown() {
  return `
    <div class="custom-dropdown" data-type="category">
      <div class="dropdown-selected">
        <span class="selected-text">선택하세요</span>
        <img src="assets/icons/chevron-down.svg" alt="dropdown" class="dropdown-arrow" />
      </div>
      <div class="dropdown-options">
        <div class="dropdown-option" data-value="">
          <span>선택하세요</span>
        </div>
        <div class="dropdown-option" data-value="생활">
          <span>생활</span>
        </div>
        <div class="dropdown-option" data-value="식비">
          <span>식비</span>
        </div>
        <div class="dropdown-option" data-value="교통">
          <span>교통</span>
        </div>
        <div class="dropdown-option" data-value="쇼핑/뷰티">
          <span>쇼핑/뷰티</span>
        </div>
        <div class="dropdown-option" data-value="의료/건강">
          <span>의료/건강</span>
        </div>
        <div class="dropdown-option" data-value="문화/여가">
          <span>문화/여가</span>
        </div>
        <div class="dropdown-option" data-value="미분류">
          <span>미분류</span>
        </div>
      </div>
    </div>
  `;
}
