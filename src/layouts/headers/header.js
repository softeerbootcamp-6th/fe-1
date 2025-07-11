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

  async function switchTab(tabName) {
    currentTab = tabName;
    const bodyContainer = document.getElementById("body-container");

    // 기존 페이지별 CSS 제거
    removePageCSS();

    try {
      switch (tabName) {
        case "list":
          // 메인 페이지 렌더링 함수 호출
          if (typeof renderMain === "function") {
            bodyContainer.innerHTML = renderMain();
            await loadCSS("src/pages/main/main.css");
            await loadScript("src/pages/main/main.js");
            if (typeof window.initMain === "function") {
              window.initMain();
            }
          }
          break;
        case "calendar":
          // 달력 페이지 렌더링 함수 호출
          if (typeof renderCalendar === "function") {
            bodyContainer.innerHTML = renderCalendar();
            await loadCSS("src/pages/calendar/calendar.css");
            await loadScript("src/pages/calendar/calendar.js");
            if (typeof window.initCalendar === "function") {
              window.initCalendar();
            }
          }
          break;
        case "stats":
          // 통계 페이지 렌더링 함수 호출
          if (typeof renderStatistic === "function") {
            bodyContainer.innerHTML = renderStatistic();
            await loadCSS("src/pages/statistic/statistic.css");
            await loadScript("src/pages/statistic/statistic.js");
            if (typeof window.initStats === "function") {
              window.initStats();
            }
          }
          break;
      }
    } catch (error) {
      console.error("Error switching tab:", error);
      bodyContainer.innerHTML = `<p>페이지를 로드할 수 없습니다.</p>`;
    }
  }

  // CSS 동적 로드 함수
  function loadCSS(cssPath) {
    return new Promise((resolve, reject) => {
      const existingCSS = document.querySelector(`link[href="${cssPath}"]`);
      if (existingCSS) {
        resolve();
        return;
      }

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssPath;
      link.className = "page-css";
      link.onload = resolve;
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  // JS 동적 로드 함수
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.type = "module";
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  // 페이지별 CSS 제거
  function removePageCSS() {
    const pageCSS = document.querySelectorAll(".page-css");
    pageCSS.forEach((css) => css.remove());
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
      switchTab(btn.dataset.tab);
    });
  });

  updateMonth();

  // 초기 메인 페이지 로드
  switchTab("list");
}

// 전역 함수에 해당 함수 등록(index.html에서 호출)
window.initHeader = initHeader;
