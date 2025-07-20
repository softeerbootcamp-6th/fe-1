import { renderCategory } from "./components/category/category-rendering.js";
import { initCategory } from "./components/category/category-handlers.js";
import { renderDonutChart } from "./components/donut-chart/donut-chart-rendering.js";
import { initDonutChart } from "./components/donut-chart/donut-chart-handlers.js";
import { renderTrendChart } from "./components/trend/trend-rendering.js";
import { renderHistoryList } from "./components/history/history-rendering.js";

export async function renderStatistic() {
  const statisticHTML = `
    <!-- 통계 컨테이너 -->
    <div class="stats-container">
      <!-- 통계 본문 -->
      <div class="statistics-content">
        <!-- 차트 영역 -->
        ${renderDonutChart()}
        
        <!-- 카테고리별 상세 정보 -->
        ${renderCategory()}
      </div>
    </div>
    
    <!-- 카테고리별 월별 지출 추이 차트 -->
    ${renderTrendChart()}

    <!-- 선택된 카테고리별 월별 지출 추이 차트 -->
    ${renderHistoryList()}
  `;

  return statisticHTML;
}

// 자동으로 통계 렌더링 및 초기화
document.addEventListener("DOMContentLoaded", function () {
  const statisticContainer = document.getElementById("statistic-container");
  if (statisticContainer) {
    renderStatistic().then((html) => {
      // 카테고리 컴포넌트 초기화
      statisticContainer.innerHTML = html;
      // 컴포넌트 초기화
      initCategory();
      initDonutChart();
    });
  }
});
