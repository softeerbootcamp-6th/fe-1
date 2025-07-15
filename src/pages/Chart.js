import { ElementManager } from "../utils/ElementManager.js";

export const renderChart = () => {
  const chart = ElementManager.renderElementId("div", "chart");
  chart.textContent = "chart";
  return chart;
};
