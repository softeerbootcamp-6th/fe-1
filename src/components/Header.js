import { renderComponent } from "../utils/render.js";
import { state, setState, addObservers } from "../store.js";
import { monthNames } from "../constants/months.js";
import { parseYMD, formatYMD } from "../utils/date.js";

export function initHeader() {
  renderHeader();
  addHeaderCenterEventDelegation();
  addHeaderMenuNavigation();
  addObservers(onHeaderStateChange);
}

function onHeaderStateChange(data) {
  if (data.curDate) updateHeaderCenter();
}

function updateHeaderCenter() {
  const center = document.querySelector(".header-center");
  if (center) {
    center.innerHTML = createHeaderCenterInnerHtml();
  }
}

function addHeaderCenterEventDelegation() {
  document.addEventListener("click", (e) => {
    const leftBtn = e.target.closest(".header-arrow-left");
    const rightBtn = e.target.closest(".header-arrow-right");
    if (leftBtn) {
      handleMonthChange("prev");
    } else if (rightBtn) {
      handleMonthChange("next");
    }
  });
}

function handleMonthChange(direction) {
  let { year, month, day } = parseYMD(state.curDate);
  if (direction === "prev") {
    month--;
    if (month < 1) {
      month = 12;
      year--;
    }
  } else if (direction === "next") {
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
  }
  setState({ curDate: formatYMD(year, month, day) });
}

function createHeaderCenterInnerHtml() {
  const { year, month } = parseYMD(state.curDate);

  return `
    <div class="header-year font-light-14">${year}</div>
    <div class="header-calendar-bar">
      <button class="header-arrow header-arrow-left" data-direction="prev"></button>
      <span class="header-month font-serif-48">${month}</span>
      <button class="header-arrow header-arrow-right" data-direction="next"></button>
    </div>
    <div class="header-month-label font-light-14">${monthNames[month - 1]}</div>
  `;
}

const ROUTE_BUTTONS = [
  { label: "메인", icon: "src/assets/icons/doc.svg", page: "" },
  { label: "캘린더", icon: "src/assets/icons/calendar.svg", page: "calendar" },
  { label: "차트", icon: "src/assets/icons/chart.svg", page: "chart" },
];

function getCurrentPageName() {
  const hash = location.hash.replace("#", "");
  if (hash === "calendar") return "캘린더";
  if (hash === "chart") return "차트";
  return "메인";
}

function renderHeader() {
  const currentPage = getCurrentPageName();
  const menuButtonsHtml = ROUTE_BUTTONS.map((btn) => {
    const isActive = currentPage === btn.label;
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
  renderComponent({
    id: "header",
    className: "header-container",
    innerHTML: `
        <div class="header-left">
          <span class="header-title font-serif-48">Wise Wallet</span>
        </div>
        <div class="header-center">
          ${createHeaderCenterInnerHtml()}
        </div>
        <div class="header-right">
          <ul class="header-menu">
            ${menuButtonsHtml}
          </ul>
        </div>
    `,
  });
}

function handleRouteButton(e) {
  const btn = e.target.closest(".header-menu-icon");
  if (!btn) return;
  const page = btn.getAttribute("data-page");
  if (page === "메인") location.hash = "";
  else if (page === "캘린더") location.hash = "calendar";
  else if (page === "차트") location.hash = "chart";
}

function addHeaderMenuNavigation() {
  document.addEventListener("click", handleRouteButton);
}

window.addEventListener("hashchange", renderHeader);
