import { renderInputBar } from "./inputBar.js";
import { renderHeader } from "./header.js";
import { renderMonthlyInfo } from "./monthlyInfo.js";
import { renderPage } from "./pages.js";

const headerContainer = document.getElementById("header-container");
const mainContainer = document.getElementById("main-container");

if (headerContainer) {
  renderHeader(headerContainer);
}

if (mainContainer) {
  const path = window.location.pathname;
  console.log("Current path:", path);
  if (path === "/calendar") {
    renderPage("calendar", mainContainer);
  } else {
    renderPage("home", mainContainer);
  }
}

const inputBarContainer = document.getElementById("input-bar-container");
const monthlyInfoContainer = document.getElementById("monthly-info-container");

if (inputBarContainer) {
  renderInputBar(inputBarContainer);
}

if (monthlyInfoContainer) {
  renderMonthlyInfo(monthlyInfoContainer);
}
