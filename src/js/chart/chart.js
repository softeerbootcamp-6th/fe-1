import {
  transactionState,
  monthState,
  chartState,
} from "../../stores/subjects/index.js";
import { subscribeChartObserver } from "../../utils/index.js";

const renderPieChart = () => {
  const $pieChart = document.querySelector(".pie-chart");
  $pieChart.addEventListener("click", (e) => {
    const $listItem = e.target.closest(".pie-chart__item");
    if (!$listItem) return;

    chartState.setSelectedCategory($listItem.dataset.category);
  });
};

const init = async () => {
  const { year, month } = monthState.getMonthInfo();
  subscribeChartObserver();
  await transactionState.loadMonthData(`${year}-${month}`);

  renderPieChart();
};

init();
