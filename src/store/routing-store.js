import { Store } from "./store.js";
import { initCalendar } from "../pages/calendar/calendar.js";
import { initMain } from "../pages/main/main.js";
import { initStatistic } from "../pages/statistic/statistic.js";
import { renderMain } from "../pages/main/main-rendering.js";
import { renderCalendar } from "../pages/calendar/calendar-rendering.js";
import { renderStatistic } from "../pages/statistic/statistic-rendering.js";

// 라우팅 상태를 관리하는 Store 인스턴스
export const routingStore = new Store({
  currentTab: "MAIN_VIEW", // 기본값은 MAIN_VIEW
});

// 라우팅 관련 유틸리티 함수들
export const routingUtils = {
  // 현재 탭 가져오기
  getCurrentTab() {
    return routingStore.getState().currentTab;
  },

  // 탭 설정
  setTab(tabName) {
    if (["MAIN_VIEW", "CALENDAR_VIEW", "STATISTIC_VIEW"].includes(tabName)) {
      routingStore.setState({ currentTab: tabName });
    }
  },

  // 메인 페이지로 이동
  goToMain() {
    routingStore.setState({ currentTab: "MAIN_VIEW" });
  },

  // 캘린더 페이지로 이동
  goToCalendar() {
    routingStore.setState({ currentTab: "CALENDAR_VIEW" });
  },

  // 통계 페이지로 이동
  goToStatistic() {
    routingStore.setState({ currentTab: "STATISTIC_VIEW" });
  },

  // 현재 탭이 메인인지 확인
  isMainView() {
    return routingStore.getState().currentTab === "MAIN_VIEW";
  },

  // 현재 탭이 캘린더인지 확인
  isCalendarView() {
    return routingStore.getState().currentTab === "CALENDAR_VIEW";
  },

  // 현재 탭이 통계인지 확인
  isStatisticView() {
    return routingStore.getState().currentTab === "STATISTIC_VIEW";
  },
};

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

// 탭 전환 함수
async function switchTab(tabName) {
  const bodyContainer = document.getElementById("body-container");

  // 기존 페이지별 CSS 제거
  removePageCSS();

  try {
    switch (tabName) {
      case "MAIN_VIEW":
        // 메인 페이지 렌더링 함수 호출
        bodyContainer.innerHTML = renderMain();
        // 병렬 로드
        await Promise.all([
          loadScript("src/pages/main/main-rendering.js"),
          loadScript("src/pages/main/main.js"),
          loadCSS("src/pages/main/main.css"),
        ]);
        initMain();
        break;

      case "CALENDAR_VIEW":
        // 달력 페이지 렌더링 함수 호출
        bodyContainer.innerHTML = renderCalendar();
        // 병렬 로드
        await Promise.all([
          loadScript("src/pages/calendar/calendar-rendering.js"),
          loadScript("src/pages/calendar/calendar.js"),
          loadCSS("src/pages/calendar/calendar.css"),
        ]);
        initCalendar();
        break;

      case "STATISTIC_VIEW":
        // 통계 페이지 렌더링 함수 호출
        bodyContainer.innerHTML = renderStatistic();
        // 병렬 로드
        await Promise.all([
          loadScript("src/pages/statistic/statistic-rendering.js"),
          loadScript("src/pages/statistic/statistic.js"),
          loadCSS("src/pages/statistic/statistic.css"),
        ]);
        setTimeout(() => {
          initStatistic();
        }, 100);
        break;
    }
  } catch (error) {
    console.error("Error switching tab:", error);
    bodyContainer.innerHTML = `<p>페이지를 로드할 수 없습니다.</p>`;
  }
}

// 라우팅 상태 변경 구독 설정
export const setupRoutingSubscription = () => {
  // 최초 렌더링 실행
  const currentTab = routingStore.getState().currentTab;
  switchTab(currentTab);

  return routingStore.subscribe((newState, oldState) => {
    if (newState.currentTab !== oldState.currentTab) {
      console.log(`탭 변경: ${oldState.currentTab} → ${newState.currentTab}`);
      switchTab(newState.currentTab);
    }
  });
};

// 탭 리스너 설정
export const setupTabListeners = () => {
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // UI 업데이트
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Store 상태 변경 (자동으로 페이지 전환됨)
      routingUtils.setTab(btn.dataset.tab);
    });
  });
};
