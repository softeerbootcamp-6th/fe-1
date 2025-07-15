import { renderComponent } from "../utils/render.js";

export function initHeader() {
  renderHeader();
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
          <div class="header-year font-light-14">2023</div>
          <div class="header-calendar-bar">
            <button class="header-arrow header-arrow-left"></button>
            <span class="header-month font-serif-48">8</span>
            <button class="header-arrow header-arrow-right"></button>
          </div>
          <div class="header-month-label font-light-14">August</div>
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
