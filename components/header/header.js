import { initDateInfo, renderDateInfo } from "./dateInfo.js";
import { initTabInfo, renderTabInfo } from "./tab.js";

export function initHeader(container) {
  initDateInfo(container.querySelector(".month-year"));
  initTabInfo(container.querySelector("nav"));
}

export function createHeader() {
  return `  
    <h1 class="logo serif-24"><a href="/">Wise Wallet</a></h1>
    <div class="flex-column month-year"></div>
    <nav></nav>
  `;
}

export function renderHeader(container) {
  container.innerHTML = createHeader();
  renderDateInfo(container.querySelector(".month-year"));
  renderTabInfo(container.querySelector("nav"));
}
