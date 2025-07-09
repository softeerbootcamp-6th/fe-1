import { navigate } from "../router.js";

export const renderHeader = () => {
  const header = document.createElement("header");
  header.id = "header";

  // logo
  const logo = document.createElement("p");
  logo.classList.add("logo");
  logo.textContent = "Wise Wallet";
  header.appendChild(logo);

  // date
  const date = document.createElement("div");
  date.classList.add("date");
  const year = "2023";
  const month = "8";
  const monthEng = "August";
  date.innerHTML = `
    <div class="arrow"><</div>
    <div class="currentDate">
        <span >${year}</span>
        <span class="month_num">${month}</span>
        <span >${monthEng}</span>
    </div>
    <div class="arrow">></div>
  `;
  header.appendChild(date);

  // navigation
  const nav = document.createElement("ul");
  nav.classList.add("nav");
  const navItems = ["doc", "calendar", "chart"];
  navItems.map((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<img src="./src/assets/${item}.png" alt="${item} icon" />`;
    li.addEventListener("click", () => {
      navigate(item);
    });
    nav.appendChild(li);
  });
  header.appendChild(nav);
  return header;
};
