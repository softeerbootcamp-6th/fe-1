import { ElementManager } from "../utils/ElementManager.js";

export const renderHeader = (currentDate) => {
  const header = ElementManager.renderElementId("header", "header");

  // logo
  const logo = ElementManager.renderElement("p", ["logo", "serif-24"]);
  logo.textContent = "Wise Wallet";
  header.appendChild(logo);

  // date
  const date = ElementManager.renderElement("div", "date");
  const year = currentDate.year;
  const month = currentDate.month;
  const monthEng = currentDate.monthEng;
  date.innerHTML = `
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
  header.appendChild(date);

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

  header.appendChild(nav);
  return header;
};
