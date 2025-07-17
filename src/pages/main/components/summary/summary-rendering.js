export function renderFormSummary() {
  return `
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
  `;
} 
