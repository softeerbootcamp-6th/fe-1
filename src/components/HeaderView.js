import { monthNames } from "../constants/months.js";
import { state } from "../store.js";
import { parseYMD } from "../utils/date.js";
import { renderComponent } from "../utils/render.js";

const ROUTE_BUTTONS = [
  { label: "메인", icon: "src/assets/icons/doc.svg", page: "" },
  {
    label: "캘린더",
    icon: "src/assets/icons/calendar.svg",
    page: "calendar",
  },
  { label: "차트", icon: "src/assets/icons/chart.svg", page: "chart" },
];

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

function createHeaderCenter() {
  const curDate = state.curDate;
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

function createHeaderRight() {
  const menuButtonsHtml = ROUTE_BUTTONS.map((btn) => {
    const isActive = state.navBarState === btn.label;
    const className =
      "header-menu-icon" + (isActive ? " header-menu-icon-active" : "");
    return `
      <li>
        <button class="${className}" data-page="${btn.label}">
          <img src="${btn.icon}"/>
        </button>
      </li>
    `;
  }).join("");

  return `
    <div class="header-right">
      <ul class="header-menu">
        ${menuButtonsHtml}
      </ul>
    </div>
  `;
}

export function renderHeader(state) {
  let innerHTML = "";
  innerHTML += createHeaderLeft();
  innerHTML += createHeaderCenter();
  innerHTML += createHeaderRight();

  renderComponent({
    id: "header",
    className: "header-container",
    innerHTML,
  });
}
