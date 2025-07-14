import {
  getCurrentMonth,
  resetSelectedMonth,
  goToPreviousMonth,
  goToNextMonth,
} from "../../utils/month.js";

/**
 * Header 컴포넌트
 *
 * // 기본 사용법
 * const header = Header({
 *   currentYear: 2025,
 *   currentMonth: 8,
 *   selectedNav: 'chart', // 'home', 'calendar', 'chart'
 *   onNavClick: (nav) => console.log('Nav clicked:', nav)
 * });
 *
 * document.body.appendChild(header);
 */

const renderMonth = () => {
  const { year, month, monthText } = getCurrentMonth();

  const yearSpan = document.querySelector(".header__year");
  const monthSpan = document.querySelector(".header__month");
  const monthNameSpan = document.querySelector(".header__month-name");

  yearSpan.textContent = year;
  monthSpan.textContent = month;
  monthNameSpan.textContent = monthText;
};

const Header = ({
  selectedNav = "home", // 'home', 'calendar', 'chart'
  onChangeMonth = null,
} = {}) => {
  const { year, month, monthText } = getCurrentMonth();

  const header = document.createElement("header");
  header.className = "header";

  const headerContents = document.createElement("div");
  headerContents.className = "header__contents";

  // 제목 생성
  const title = document.createElement("h1");
  title.className = "header__title font-serif-24";
  title.textContent = "Wise Wallet";
  headerContents.appendChild(title);

  // 월 선택 영역 생성
  const monthContainer = document.createElement("div");
  monthContainer.className = "header__month-container";

  // 이전 월 버튼
  const prevButton = document.createElement("button");
  prevButton.className = "header__month-button";
  const prevIcon = document.createElement("img");
  prevIcon.src = "/src/assets/icons/chevron-left.svg";
  prevIcon.alt = "arrow-left";
  prevButton.appendChild(prevIcon);

  prevButton.addEventListener("click", () => {
    goToPreviousMonth();
    renderMonth();
    if (onChangeMonth) onChangeMonth();
  });

  monthContainer.appendChild(prevButton);

  // 월 정보
  const monthInfo = document.createElement("div");
  monthInfo.className = "header__month-info";

  const yearSpan = document.createElement("span");
  yearSpan.className = "header__year font-light-14";
  yearSpan.textContent = year;

  const monthSpan = document.createElement("span");
  monthSpan.className = "header__month font-serif-48";
  monthSpan.textContent = month;

  monthSpan.addEventListener("click", () => {
    resetSelectedMonth();
    renderMonth();
    if (onChangeMonth) onChangeMonth();
  });

  const monthNameSpan = document.createElement("span");
  monthNameSpan.className = "header__month-name font-light-14";
  monthNameSpan.textContent = monthText;

  monthInfo.appendChild(yearSpan);
  monthInfo.appendChild(monthSpan);
  monthInfo.appendChild(monthNameSpan);
  monthContainer.appendChild(monthInfo);

  // 다음 월 버튼
  const nextButton = document.createElement("button");
  nextButton.className = "header__month-button";
  const nextIcon = document.createElement("img");
  nextIcon.src = "/src/assets/icons/chevron-right.svg";
  nextIcon.alt = "arrow-right";
  nextButton.appendChild(nextIcon);

  nextButton.addEventListener("click", () => {
    goToNextMonth();
    renderMonth();
    if (onChangeMonth) onChangeMonth();
  });

  monthContainer.appendChild(nextButton);

  headerContents.appendChild(monthContainer);

  // 네비게이션 생성
  const nav = document.createElement("ul");
  nav.className = "header__nav";

  const navItems = [
    { id: "home", icon: "doc.svg", alt: "home", path: "/" },
    {
      id: "calendar",
      icon: "calendar.svg",
      alt: "calendar",
      path: "/calendar",
    },
    { id: "chart", icon: "chart.svg", alt: "chart", path: "/chart" },
  ];

  navItems.forEach((item) => {
    const li = document.createElement("li");
    li.className = `header__nav-item${
      selectedNav === item.id ? " header__nav-item--selected" : ""
    }`;

    const button = document.createElement("button");
    button.className = "header__nav-button";
    button.type = "button";

    const icon = document.createElement("img");
    icon.src = `/src/assets/icons/${item.icon}`;
    icon.alt = item.alt;

    button.appendChild(icon);

    // 라우터를 사용한 네비게이션
    button.addEventListener("click", (e) => {
      e.preventDefault();
      if (window.router) {
        window.router.navigate(item.path);
      }
    });

    li.appendChild(button);
    nav.appendChild(li);
  });

  headerContents.appendChild(nav);
  header.appendChild(headerContents);

  return header;
};

export default Header;
