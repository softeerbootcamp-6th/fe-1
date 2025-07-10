import {
  renderMainPage,
  renderCalendarPage,
  renderChartPage,
} from "./pages.js";
import { updateNavigationActive } from "./components/header.js";

const routes = {
  "/": renderMainPage,
  "/calendar": renderCalendarPage,
  "/chart": renderChartPage,
};

export function navigate(url) {
  history.pushState({}, "", url);
  render();
}

export function render() {
  const path = window.location.pathname;
  const container = document.getElementById("main-container");
  const routeFunction = routes[path];

  if (routeFunction) {
    routeFunction();
  } else {
    container.innerHTML = "<h1>404 Not Found</h1>";
  }

  updateNavigationActive();
}
