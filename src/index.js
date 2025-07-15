import { initHeader } from "./components/Header.js";
import { createMainLayout } from "./pages/main.js";
import { createCalendarPage } from "./pages/calendar.js";
import { createChartPage } from "./pages/chart.js";

function renderContentLayout() {
  const hash = location.hash.replace("#", "");
  const main = document.getElementById("main");

  const pageMap = {
    calendar: createCalendarPage,
    chart: createChartPage,
    "": createMainLayout, // 기본 경로
  };

  const renderPage = pageMap[hash] || createMainLayout;
  renderPage(main);
}

initHeader();
renderContentLayout();

window.addEventListener("hashchange", renderContentLayout);
