import { DateStore, dateStore } from "../store/DateStore.js";
import { ElementManager } from "../utils/ElementManager.js";
import { EventDispatcher } from "../utils/EventDispatcher.js";

export const renderHeader = () => {
  const header = ElementManager.renderElementId("header", "header");
  const headerContainer = ElementManager.renderElement(
    "div",
    "header-container"
  );

  // logo
  const logo = ElementManager.renderElement("p", ["logo", "serif-24"]);
  logo.textContent = "Wise Wallet";
  headerContainer.appendChild(logo);

  // date
  const dateContainer = ElementManager.renderElement("div", "date");
  const year = dateStore.data.year;
  const month = dateStore.data.month;
  const monthEng = DateStore.parseMonthToEng(month);
  dateContainer.innerHTML = `
    <div class="arrow arrow-left">
      <img src="./src/assets/chevron-left.png" alt="left arrow" />
    </div>
    <div class="currentDate">
        <span >${year}</span>
        <span class="month_num serif-48">${month}</span>
        <span >${monthEng}</span>
    </div>
    <div class="arrow arrow-right">
      <img src="./src/assets/chevron-right.png" alt="right arrow" />
    </div>
  `;
  headerContainer.appendChild(dateContainer);

  // navigation
  const nav = ElementManager.renderElement("nav", "nav");
  const navItems = ["doc", "calendar", "chart"];
  navItems.forEach((item, idx) => {
    const navItem = ElementManager.renderElement("a", "nav-item");
    navItem.dataset.path = item;
    navItem.href = item;
    navItem.innerHTML = `<img src="./src/assets/${item}.png" alt="${item} icon" />
    `;
    if (idx === 0) navItem.classList.add("active");
    navItem.dataset.item = item;
    nav.appendChild(navItem);
  });
  headerContainer.appendChild(nav);
  header.appendChild(headerContainer);

  dateStore.subscribe((newData) => {
    const yearSpan = dateContainer.querySelector("span:nth-child(1)");
    const monthNumSpan = dateContainer.querySelector("span:nth-child(2)");
    const monthEngSpan = dateContainer.querySelector("span:nth-child(3)");

    if (yearSpan) yearSpan.textContent = newData.year;
    if (monthNumSpan) monthNumSpan.textContent = newData.month;
    if (monthEngSpan)
      monthEngSpan.textContent = DateStore.parseMonthToEng(newData.month);
  });

  EventDispatcher.register({
    eventType: "click",
    selector: "arrow",
    handler: ({ target }) => {
      const arrowLeft = target.closest(".arrow-left");
      const arrowRight = target.closest(".arrow-right");
      if (arrowLeft) {
        dateStore.dispatch("decreaseMonth");
      } else if (arrowRight) {
        dateStore.dispatch("increaseMonth");
      }
    },
  });

  return header;
};
