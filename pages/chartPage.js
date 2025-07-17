import { renderDonutChartSVG } from "../components/chart/donutChart.js";

export function createChartPage() {
  return `
    <div class="chart-page">
      <h2>차트</h2>
    </div>
  `;
}

export function renderChartPage() {
  const mainContainer = document.getElementById("main-container");
  if (mainContainer) {
    mainContainer.innerHTML = `
      <div class="container flex-column chart-page">
        <div id="donut-chart-container" class="flex-between">
          <div id="donut-chart-canvas"></div>
          <div id="donut-chart-legend"></div>
        </div>
        <div id="line-chart-container"></div>
        <div class="transaction-list-container container"></div>
      </div>
    `;
    const donutContainer = mainContainer.querySelector(
      "#donut-chart-container"
    );
    renderDonutChartSVG(donutContainer);
  }
}
