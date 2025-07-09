import { renderInputBar } from "./inputBar.js";
import { renderHeader } from "./header.js";
import { renderMonthlyInfo } from "./monthlyInfo.js";

const inputBarContainer = document.getElementById("input-bar-container");
const headerContainer = document.getElementById("header-container");
const monthlyInfoContainer = document.getElementById("monthly-info-container");

if (inputBarContainer) {
  renderInputBar(inputBarContainer);
}

if (headerContainer) {
  renderHeader(headerContainer);
}

if (monthlyInfoContainer) {
  renderMonthlyInfo(monthlyInfoContainer);
}
