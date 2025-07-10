function initHeader() {
  // DOM 쿼리 설정
  const yearEl = document.querySelector("#currentMonth .year");
  const monthNumEl = document.querySelector("#currentMonth .month-num");
  const monthEngEl = document.querySelector("#currentMonth .month-eng");
  const prevBtn = document.getElementById("prevMonthBtn");
  const nextBtn = document.getElementById("nextMonthBtn");
  const tabBtns = document.querySelectorAll(".tab-btn");

  // 월 이름 설정
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

  // tab-manager.js
  let currentTab = "list";

  function switchTab(tabName) {
    currentTab = tabName;
    const bodyContainer = document.getElementById("body-container");

    switch (tabName) {
      case "list":
        bodyContainer.innerHTML = renderMainContent();
        setupMainEventListeners();
        break;
      case "calendar":
        bodyContainer.innerHTML = renderCalendarContent();
        setupCalendarEventListeners();
        break;
      case "stats":
        bodyContainer.innerHTML = renderChartContent();
        setupChartEventListeners();
        break;
    }
  }

  function setupTabListeners() {
    const tabBtns = document.querySelectorAll(".tab-btn");
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        switchTab(btn.dataset.tab);
      });
    });
  }

  function updateMonth() {
    yearEl.textContent = window.currentYear;
    monthNumEl.textContent = window.currentMonth + 1;
    monthEngEl.textContent = monthNames[window.currentMonth];
  }

  prevBtn.addEventListener("click", () => {
    window.currentMonth--;
    if (window.currentMonth < 0) {
      window.currentMonth = 11;
      window.currentYear--;
    }
    updateMonth();

    // 전역 함수 호출
    if (window.onMonthChanged) {
      window.onMonthChanged(window.currentYear, window.currentMonth);
    }
  });

  nextBtn.addEventListener("click", () => {
    window.currentMonth++;
    if (window.currentMonth > 11) {
      window.currentMonth = 0;
      window.currentYear++;
    }
    updateMonth();

    // 전역 함수 호출
    if (window.onMonthChanged) {
      window.onMonthChanged(window.currentYear, window.currentMonth);
    }
  });

  // 탭 클릭 시 active 변경 및 화면 전환
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  updateMonth();
}

// 전역 함수에 해당 함수 등록(index.html에서 호출)
window.initHeader = initHeader;
window.switchTab = switchTab;
window.setupTabListeners = setupTabListeners;
