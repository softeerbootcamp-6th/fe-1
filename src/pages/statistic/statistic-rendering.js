import { renderCategory } from "./components/category/category-rendering.js";
import { initCategory } from "./components/category/category-handlers.js";

export async function renderStatistic() {
  const statisticHTML = `
    <!-- 통계 컨테이너 -->
    <div class="stats-container">
      <!-- 통계 본문 -->
      <div class="statistics-content">
        <!-- 차트 영역 -->
        <div class="stats-chart">
          <div id="chart-placeholder"></div>
        </div>
        
        <!-- 카테고리별 상세 정보 -->
        <div class="stats-categories">
          ${renderCategory()}
        </div>
      </div>
    </div>
    
    <!-- 카테고리별 월별 지출 추이 차트 -->
    <div class="trend-chart" id="trend-chart"></div>

    <!-- 선택된 카테고리별 월별 지출 추이 차트 -->
    <div class="history-list" id="history-list"></div>
  `;

  return statisticHTML;
}

// 자동으로 통계 렌더링 및 초기화
document.addEventListener("DOMContentLoaded", function () {
  const bodyContainer = document.getElementById("body-container");
  if (bodyContainer) {
    renderStatistic().then((html) => {
      bodyContainer.innerHTML = html;
      // 카테고리 컴포넌트 초기화
      initCategory();
    });
  }
});
