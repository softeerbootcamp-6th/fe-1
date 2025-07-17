import { HeaderTemplate } from "../../views/index.js";
import {monthState} from "../../stores/subjects/index.js";

const Header = async ({
  selectedNav = "home", // 'home', 'calendar', 'chart'
} = {}) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = HeaderTemplate;
  const header = tempDiv.firstElementChild;

  // 🔹 월 정보
  const $year = header.querySelector(".header__year");
  const $month = header.querySelector(".header__month");
  const $monthText = header.querySelector(".header__month-name");

  const $prevBtn = header.querySelector(".month-button--prev");
  const $nextBtn = header.querySelector(".month-button--next");

  const renderMonth = (monthInfo) => {
    $year.textContent = `${monthInfo.year}`;
    $month.textContent = `${monthInfo.month}`;
    $monthText.textContent = `${monthInfo.monthText}`;
  };

  renderMonth(monthState.getMonthInfo());

  monthState.subscribe({
    update: renderMonth,
  });

  $prevBtn.addEventListener("click", () => {
    monthState.goToPreviousMonth();
  });

  $nextBtn.addEventListener("click", () => {
    monthState.goToNextMonth();
  });

  // 🔹 네비게이션
  const $headerNav = header.querySelector(".header__nav");
  const $headerNavItems = $headerNav.querySelectorAll(".header__nav-item");

  $headerNavItems.forEach((item) => {
    if (item.dataset.id === selectedNav) {
      item.classList.add("header__nav-item--selected");
    }
  });

  $headerNav.addEventListener("click", (e) => {
    e.preventDefault();
    const target = e.target.closest("li");
    if (target) {
      const { id } = target.dataset;
      if (window.router) {
        window.router.navigate(`/${id === "home" ? "" : id}`);
      }
    }
  });

  return header;
};

export default Header;
