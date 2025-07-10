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
  navItems.forEach((item, idx) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <a class="nav" href="#${item}">
      <img src="./src/assets/${item}.png" alt="${item} icon" />
    </a>
    `;
    if (idx === 0) li.classList.add("active");
    li.dataset.item = item;
    nav.appendChild(li);
  });

  // 이벤트 위임
  nav.addEventListener("click", (e) => {
    const target = e.target.closest("li");
    if (!target) return;
    const current = nav.querySelector(".active");
    if (current) current.classList.remove("active");
    target.classList.add("active");
  });

  header.appendChild(nav);
  return header;
};
