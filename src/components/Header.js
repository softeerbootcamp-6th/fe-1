import { renderComponent } from "../utils/render.js";
import { state, setState, addObservers } from "../store.js";
import { monthNames } from "../constants/months.js";
import { parseYMD, formatYMD } from "../utils/date.js";

export function initHeader() {
  renderHeader();
  addHeaderCenterEventDelegation();
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
  // 일자는 1일로 고정(월 이동 시)
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

function renderHeader() {
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
            <li>
              <button class="header-menu-icon header-menu-icon-active" data-index="0">
                <img src="src/assets/icons/doc.svg"/>
              </button>
            </li>
            <li>
              <button class="header-menu-icon" data-index="1">
                <img src="src/assets/icons/calendar.svg"/>
              </button>
            </li>
            <li>
              <button class="header-menu-icon" data-index="2">
                <img src="src/assets/icons/chart.svg"/>
              </button>
            </li>
          </ul>
        </div>
    `,
  });
}
