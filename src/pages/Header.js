export const renderHeader = (currentDate) => {
  const header = document.createElement("header");
  header.id = "header";

  // logo
  const logo = document.createElement("p");
  logo.classList.add("logo");
  logo.classList.add("serif-24");
  logo.textContent = "Wise Wallet";
  header.appendChild(logo);

  // date
  const date = document.createElement("div");
  date.classList.add("date");
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
  const nav = document.createElement("ul");
  nav.classList.add("nav");
  const navItems = ["doc", "calendar", "chart"];
  navItems.forEach((item, idx) => {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.dataset.path = item;
    li.innerHTML = `
    <a class="nav" href="${item}">
      <img src="./src/assets/${item}.png" alt="${item} icon" />
    </a>
    `;
    if (idx === 0) li.classList.add("active");
    li.dataset.item = item;
    nav.appendChild(li);
  });

  header.appendChild(nav);
  return header;
};
