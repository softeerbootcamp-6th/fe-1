import { renderMainPage } from "../pages/mainPage.js";
import { renderCalendarPage } from "../pages/calendarPage.js";
import { renderChartPage } from "../pages/chartPage.js";
import { pathStore } from "../store/index.js";

const routes = {
  "/": renderMainPage,
  "/calendar": renderCalendarPage,
  "/chart": renderChartPage,
};

export function navigate(url) {
  history.pushState({}, "", url);
  pathStore.setPath(url);
}

export function render() {
  const path = pathStore.getPath();
  const container = document.getElementById("main-container");
  const renderPage = routes[path];

  if (renderPage) {
    renderPage();
  } else {
    container.innerHTML = "<h1>404 Not Found</h1>";
  }
}
