export function renderCalendarGrid() {
  return `
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
    </div>
  `;
}
