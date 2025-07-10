import {
  renderMainPage,
  renderCalendarPage,
  renderGraphPage,
} from "./pages.js";

const routes = {
  "/": renderMainPage,
  "/calendar": renderCalendarPage,
  "/graph": renderGraphPage,
};

export function render() {
  const path = window.location.pathname;
  const container = document.getElementById("main-container");
  const routeFunction = routes[path];

  if (routeFunction) {
    routeFunction();
  } else {
    container.innerHTML = "<h1>404 Not Found</h1>";
  }
}
