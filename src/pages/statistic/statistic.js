import { updateHeaderDate } from "../../utils/date-utils.js";
import { initDonutChart } from "./components/donut-chart/donut-chart-handlers.js";
import { initCategory } from "./components/category/category-handlers.js";
import { initHistoryList } from "./components/history/history-handlers.js";

export async function initStatistic() {
  // 초기 렌더링
  updateHeaderDate();
  await initDonutChart();
  // 카테고리 컴포넌트 초기화
  await initCategory();
  await initHistoryList();
}
