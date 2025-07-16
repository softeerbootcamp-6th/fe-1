import { initCalendar } from "./calendar.js";

export function renderCalendar() {
  const calendarHTML = `
   <!-- 캘린더 컨테이너 -->
    <div class="calendar-container">
      <!-- 캘린더 헤더 (요일) -->
      <div class="calendar-header">
        <div class="calendar-day-header">일</div>
        <div class="calendar-day-header">월</div>
        <div class="calendar-day-header">화</div>
        <div class="calendar-day-header">수</div>
        <div class="calendar-day-header">목</div>
        <div class="calendar-day-header">금</div>
        <div class="calendar-day-header">토</div>
      </div>

      <!-- 캘린더 본체 -->
      <div class="calendar-grid" id="calendar-body">
        <!-- 달력 셀들이 JavaScript로 동적 생성됨 -->
      </div>

      <!-- 월별 요약 정보 -->
      <div class="calendar-summary">
      <div class="summary-row">
        <div class="summary-item">
          <span class="summary-label">총 수입</span>
          <span class="summary-value income" id="total-income">0원</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">/ 총 지출</span>
          <span class="summary-value expense" id="total-expense">0원</span>
        </div>
      </div>
      <div class="summary-row">
        <div class="summary-item">
          <span class="summary-label">총합</span>
          <span class="summary-value" id="total-balance">0원</span>
        </div>
      </div>
      </div>
    </div>
  `;

  return calendarHTML;
}

// 자동으로 헤더 렌더링 및 초기화
document.addEventListener("DOMContentLoaded", function () {
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    headerContainer.innerHTML = renderCalendar();
    initCalendar();
  }
});
