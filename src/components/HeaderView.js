import { monthNames } from "../constants/months.js";
import { parseYMD } from "../utils/date.js";
import { renderComponent } from "../utils/render.js";

function getCurrentPageName() {
  const hash = location.hash.replace("#", "");
  if (hash === "calendar") return "캘린더";
  if (hash === "chart") return "차트";
  return "메인";
}

function createHeaderLeft() {
  return `
  <div class="header-left">
    <span class="header-title font-serif-48">Wise Wallet</span>
  </div>
  `;
}

function createHeaderCenter(curDate) {
  const { year, month } = parseYMD(curDate);
  return `
    <div class="header-center">
      <div class="header-year font-light-14">${year}</div>
      <div class="header-calendar-bar">
        <button class="header-arrow header-arrow-left" data-direction="prev"></button>
        <span class="header-month font-serif-48">${month}</span>
        <button class="header-arrow header-arrow-right" data-direction="next"></button>
      </div>
      <div class="header-month-label font-light-14">${
        monthNames[month - 1]
      }</div>
    </div>
    `;
}

function createHeaderRight(navBarState) {
  return `
    <div class="header-right">
      <ul class="header-menu">
        <li>
          <button class="header-menu-icon${
            navBarState === "메인" ? " header-menu-icon-active" : ""
          }" data-page="메인">
            <img src="src/assets/icons/doc.svg" alt="메인 아이콘" />
          </button>
        </li>
        <li>
          <button class="header-menu-icon${
            navBarState === "캘린더" ? " header-menu-icon-active" : ""
          }" data-page="캘린더">
            <img src="src/assets/icons/calendar.svg" alt="캘린더 아이콘" />
          </button>
        </li>
        <li>
          <button class="header-menu-icon${
            navBarState === "차트" ? " header-menu-icon-active" : ""
          }" data-page="차트">
            <img src="src/assets/icons/chart.svg" alt="차트 아이콘" />
          </button>
        </li>
      </ul>
    </div>
  `;
}

export function renderHeader(state) {
  let innerHTML = "";
  innerHTML += createHeaderLeft();
  innerHTML += createHeaderCenter(state.curDate);
  innerHTML += createHeaderRight(state.navBarState);

  renderComponent({
    id: "header",
    className: "header-container",
    innerHTML,
  });
}
