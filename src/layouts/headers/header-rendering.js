function renderHeader() {
  const headerHTML = `
    <header class="header">
      <!-- 1. 왼쪽: 로고 -->
      <a href="/" class="header__logo">
        <img src="assets/icons/logo.svg" alt="Wise Wallet 로고" />
      </a>

      <!-- 2. 중앙: 연/월 선택 -->
      <div class="header__month-selector">
        <button id="prevMonthBtn" aria-label="이전 달">&lt;</button>
        <div id="currentMonth" class="month-display">
          <span class="year"></span>
          <span class="month-num"></span>
          <span class="month-eng"></span>
        </div>
        <button id="nextMonthBtn" aria-label="다음 달">&gt;</button>
      </div>

      <!-- 3. 오른쪽: 탭 -->
      <nav class="header__tabs">
        <button class="tab-btn active" data-tab="LIST_VIEW" aria-label="내역">
          <img src="assets/icons/doc.svg" alt="내역" />
        </button>
        <button class="tab-btn" data-tab="CALENDAR_VIEW" aria-label="달력">
          <img src="assets/icons/calendar.svg" alt="달력" />
        </button>
        <button class="tab-btn" data-tab="STATISTIC_VIEW" aria-label="통계">
          <img src="assets/icons/chart.svg" alt="통계" />
        </button>
      </nav>
    </header>
  `;

  return headerHTML;
}

// 자동으로 헤더 렌더링 및 초기화
document.addEventListener("DOMContentLoaded", function () {
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    headerContainer.innerHTML = renderHeader();
    if (typeof initHeader === "function") initHeader();
  }
});
