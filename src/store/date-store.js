import { Store } from "./store.js";
import { initCalendar } from "../pages/calendar/calendar.js";
import { initStatistic } from "../pages/statistic/statistic.js";
import { initMain } from "../pages/main/main.js";
import { routingStore } from "./routing-store.js";
import { onMonthChanged } from "../utils/data-utils.js";

// 날짜 관련 상태를 관리하는 Store 인스턴스
export const dateStore = new Store({
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth() + 1, // 1-12 인덱스 사용
});

// dateStore 가 바뀔 때마다 실행되는 함수들 (현재 활성 탭에만 적용)
dateStore.subscribe((newState, oldState) => {
  // 현재 활성 탭 확인
  const currentTab = routingStore.getState().currentTab;
  onMonthChanged();

  // 현재 탭에 해당하는 페이지만 업데이트
  switch (currentTab) {
    case "CALENDAR_VIEW":
      initCalendar();
      break;
    case "STATISTIC_VIEW":
      initStatistic();
      break;
    case "MAIN_VIEW":
      initMain();
      break;
  }
});

// 날짜 관련 유틸리티 함수들
export const dateUtils = {
  // 현재 년도 가져오기
  getCurrentYear() {
    return dateStore.getState().currentYear;
  },

  // 현재 월 가져오기 (1-12)
  getCurrentMonth() {
    return dateStore.getState().currentMonth;
  },

  // 년도 설정
  setCurrentYear(year) {
    dateStore.setState({ currentYear: year });
  },

  // 월 설정 (1-12)
  setCurrentMonth(month) {
    dateStore.setState({ currentMonth: month });
  },

  // 년도와 월 동시 설정
  setCurrentDate(year, month) {
    dateStore.setState({
      currentYear: year,
      currentMonth: month,
    });
  },

  // 다음 달로 이동
  nextMonth() {
    let currentYear = dateStore.getState().currentYear;
    let currentMonth = dateStore.getState().currentMonth;

    // console.log("nextMonth 호출 전:", { currentYear, currentMonth });

    if (currentMonth === 12) {
      // 12월
      currentMonth = 1; // 1월
      currentYear++;
    } else {
      currentMonth++;
    }

    // console.log("nextMonth 호출 후:", { currentYear, currentMonth });
    dateStore.setState({ currentYear, currentMonth });
  },

  // 이전 달로 이동
  prevMonth() {
    let currentYear = dateStore.getState().currentYear;
    let currentMonth = dateStore.getState().currentMonth;

    // console.log("prevMonth 호출 전:", { currentYear, currentMonth });

    if (currentMonth === 1) {
      // 1월
      currentMonth = 12; // 12월
      currentYear--;
    } else {
      currentMonth--;
    }

    // console.log("prevMonth 호출 후:", { currentYear, currentMonth });
    dateStore.setState({ currentYear, currentMonth });
  },
};
