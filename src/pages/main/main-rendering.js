function renderMain() {
  const mainHTML = `
        <!-- 가계부 입력 폼 -->
        <div class="input-row-wrapper">
        <div class="input-row">
            <div class="input-cell date">
            <span>일자</span>
            <div class="input-cell-content-wrapper">
                <input type="date" class="date-input" />
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
            </div>
            </div>
            <div class="input-cell category">
            <span>분류</span>
            <div class="input-cell-content-wrapper">
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
            </div>
            </div>
            <div class="input-cell submit">
            <button class="circle-btn">
              <img src="assets/icons/unchecked.svg" width="40" height="40" alt="비활성화된 체크" />
            </button>
            </div>
        </div>
        </div>
        <!-- 가계부 요약 (js로 렌더링) 아래는 구조 파악을 위한 예시-->
        <div class="summary-row">
        <span>전체 내역 <b>0건</b></span>
        <div class="summary-row-right">
            <img src="assets/icons/checkbox.svg" alt="체크 아이콘" />
            <span style="margin-left: 8px; margin-right: 16px">수입 <b>0</b></span>
            <img src="assets/icons/checkbox.svg" alt="체크 아이콘" />
            <span style="margin-left: 8px; margin-right: 16px">지출 <b>0</b></span>
        </div>
        </div>
        <!-- 가계부 내역 리스트 (js로 렌더링) 아래는 구조 파악을 위한 예시-->
        <div class="history-list">
        <div class="history-item">
            <div class="history-category category-식비">식비</div>
            <div class="history-content">잔치국수와 김밥</div>
            <div class="history-method">현대카드</div>
            <div class="history-amount minus">20,000원</div>
        </div>
        </div>
    `;

  return mainHTML;
}

// 자동으로 헤더 렌더링 및 초기화
document.addEventListener("DOMContentLoaded", function () {
  const bodyContainer = document.getElementById("body-container");
  if (bodyContainer) {
    bodyContainer.innerHTML = renderMain();
    if (typeof initMain === "function") initMain();
  }
});
