import { transactionState, monthState } from "../../stores/subjects/index.js";
import { ChartObserver } from "../../stores/observers/index.js";
import { ChartView } from "../../views/index.js";

const init = async () => {
  const { year, month } = monthState.getMonthInfo();
  const chartView = new ChartView();
  const chartObserver = new ChartObserver(chartView);
  transactionState.subscribe(chartObserver);

  await transactionState.loadMonthData(`${year}-${month}`);
};

init();
