import { navigate } from "../router.js";

export const renderHeader = () => {
  const header = document.createElement("header");

  // logo
  const logo = document.createElement("p");
  logo.textContent = "Wise Wallet";
  header.appendChild(logo);

  // date
  const date = document.createElement("div");
  const year = "2023";
  const month = "8";
  const monthEng = "August";
  date.innerHTML = `
    <span class="year">${year}</span>
    <span class="month_num">${month}</span>
    <span class="month_eng">${monthEng}</span>
    <div class="arrow"><</div>
    <div class="arrow"><</div>
  `;
  header.appendChild(date);

  // navigation
  const nav = document.createElement("ul");
  const navItems = ["doc", "calendar", "chart"];
  navItems.map((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<img src="./src/assets/${item}.png" alt="${item} icon" />`;
    li.classList.add("nav_item");
    li.addEventListener("click", () => {
      navigate(item);
    });
    nav.appendChild(li);
  });
  header.appendChild(nav);
  return header;
};
