export function renderHistoryList() {
  return `
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
}
