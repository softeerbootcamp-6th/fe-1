import { ElementManager } from "../utils/ElementManager.js";
import { renderDoc } from "./Doc.js";
import { renderCalendar } from "./Calendar.js";
import { renderChart } from "./Chart.js";

const mainList = {
  doc: renderDoc,
  calendar: renderCalendar,
  chart: renderChart,
};
export const renderMain = (type = "doc") => {
  const main = ElementManager.renderElementId("main", "main");
  console.log(type);
  main.appendChild(mainList[type]());
  return main;
};
