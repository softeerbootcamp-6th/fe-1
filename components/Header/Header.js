/**
 * Header 컴포넌트
 *
 * // 기본 사용법
 * const header = Header({
 *   currentYear: 2025,
 *   currentMonth: 8,
 *   selectedNav: 'chart', // 'home', 'calendar', 'chart'
 *   onMonthChange: (direction) => console.log('Month changed:', direction),
 *   onNavClick: (nav) => console.log('Nav clicked:', nav)
 * });
 *
 * document.body.appendChild(header);
 */
const Header = ({
  currentYear = new Date().getFullYear(),
  currentMonth = new Date().getMonth() + 1,
  selectedNav = "home", // 'home', 'calendar', 'chart'
  onMonthChange = null,
  onNavClick = null,
} = {}) => {
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
  monthContainer.className = "header__month";

  // 이전 월 버튼
  const prevButton = document.createElement("button");
  prevButton.className = "header__month-button";
  const prevIcon = document.createElement("img");
  prevIcon.src = "/assets/icons/chevron-left.svg";
  prevIcon.alt = "arrow-left";
  prevButton.appendChild(prevIcon);

  if (onMonthChange) {
    prevButton.addEventListener("click", () => onMonthChange("prev"));
  }
  monthContainer.appendChild(prevButton);

  // 월 정보
  const monthInfo = document.createElement("div");
  monthInfo.className = "header__month-info";

  const yearSpan = document.createElement("span");
  yearSpan.className = "header__year font-light-14";
  yearSpan.textContent = currentYear;

  const monthSpan = document.createElement("span");
  monthSpan.className = "header__month font-serif-48";
  monthSpan.textContent = currentMonth.toString().padStart(2, "0");

  const monthNameSpan = document.createElement("span");
  monthNameSpan.className = "header__month-name font-light-14";
  monthNameSpan.textContent = getMonthName(currentMonth);

  monthInfo.appendChild(yearSpan);
  monthInfo.appendChild(monthSpan);
  monthInfo.appendChild(monthNameSpan);
  monthContainer.appendChild(monthInfo);

  // 다음 월 버튼
  const nextButton = document.createElement("button");
  nextButton.className = "header__month-button";
  const nextIcon = document.createElement("img");
  nextIcon.src = "/assets/icons/chevron-right.svg";
  nextIcon.alt = "arrow-right";
  nextButton.appendChild(nextIcon);

  if (onMonthChange) {
    nextButton.addEventListener("click", () => onMonthChange("next"));
  }
  monthContainer.appendChild(nextButton);

  headerContents.appendChild(monthContainer);

  // 네비게이션 생성
  const nav = document.createElement("ul");
  nav.className = "header__nav";

  const navItems = [
    { id: "home", icon: "doc.svg", alt: "home", href: "/pages/home/home.html" },
    {
      id: "calendar",
      icon: "calendar.svg",
      alt: "calendar",
      href: "/pages/calandar/calandar.html",
    },
    {
      id: "chart",
      icon: "chart.svg",
      alt: "chart",
      href: "/pages/chart/chart.html",
    },
  ];

  navItems.forEach((item) => {
    const li = document.createElement("li");
    li.className = `header__nav-item${
      selectedNav === item.id ? " header__nav-item--selected" : ""
    }`;

    const link = document.createElement("a");
    link.href = item.href;

    const icon = document.createElement("img");
    icon.src = `/assets/icons/${item.icon}`;
    icon.alt = item.alt;

    link.appendChild(icon);
    li.appendChild(link);

    if (onNavClick) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        onNavClick(item.id);
      });
    }

    nav.appendChild(li);
  });

  headerContents.appendChild(nav);

  header.appendChild(headerContents);

  return header;
};

// 월 이름을 반환하는 헬퍼 함수
const getMonthName = (month) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[month - 1];
};

export default Header;
