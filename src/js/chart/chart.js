import {
  transactionState,
  monthState,
  chartState,
} from "../../stores/subjects/index.js";
import { ChartObserver } from "../../stores/observers/index.js";
import { ChartView } from "../../views/index.js";

const init = async () => {
  const { year, month } = monthState.getMonthInfo();
  const chartView = new ChartView();
  const chartObserver = new ChartObserver(chartView);
  transactionState.subscribe(chartObserver);
  chartState.subscribe(chartObserver);

  await transactionState.loadMonthData(`${year}-${month}`);

  const $pieChart = document.querySelector(".pie-chart");
  $pieChart.addEventListener("click", (e) => {
    const $listItem = e.target.closest(".pie-chart__item");
    if (!$listItem) return;

    chartState.setSelectedCategory($listItem.dataset.category);
  });
};

init();
