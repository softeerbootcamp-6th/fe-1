// 세션 스토리지 키
const MONTH_STORAGE_KEY = "selectedMonth";

// 월 이름 배열
const MONTH_NAMES = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

/**
 * 현재 시스템 날짜를 객체로 반환 (내부 사용)
 * @returns {object} 현재 날짜 정보
 */
const _getCurrentSystemMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const monthIndex = now.getMonth(); // 0-11
  const monthNumber = String(monthIndex + 1).padStart(2, "0");
  saveSelectedMonth(`${year}-${monthNumber}`);
  return {
    year,
    month: monthNumber,
    monthText: MONTH_NAMES[monthIndex],
  };
};

/**
 * 세션 스토리지에서 선택된 월을 가져와서 반환, 없으면 현재 월
 * @returns {object} 선택된 월 정보
 */
const getCurrentMonth = () => {
  try {
    const savedMonth = sessionStorage.getItem(MONTH_STORAGE_KEY);

    if (savedMonth) {
      // 세션 스토리지에 저장된 월이 있으면 파싱해서 반환
      const [year, month] = savedMonth.split("-");
      const monthIndex = parseInt(month) - 1; // 0-11로 변환
      return {
        year: parseInt(year),
        month,
        monthText: MONTH_NAMES[monthIndex],
      };
    } else {
      // 저장된 월이 없으면 현재 시스템 월 반환
      return _getCurrentSystemMonth();
    }
  } catch (error) {
    console.error("Failed to get month from session storage:", error);
    return _getCurrentSystemMonth();
  }
};

/**
 * 선택된 월을 세션 스토리지에 저장
 * @param {string} month - YYYY-MM 형식의 월 문자열
 */
const saveSelectedMonth = (month) => {
  try {
    sessionStorage.setItem(MONTH_STORAGE_KEY, month);
  } catch (error) {
    console.error("Failed to save selected month to session storage:", error);
  }
};

/**
 * 선택된 월을 초기화 (현재 시스템 월로 설정)
 */
const resetSelectedMonth = () => {
  const systemMonth = _getCurrentSystemMonth();
  saveSelectedMonth(`${systemMonth.year}-${systemMonth.month}`);
  return systemMonth;
};

/**
 * 이전 달로 이동
 * @returns {object} 변경된 월 정보
 */
const goToPreviousMonth = () => {
  const currentSelected = getCurrentMonth();
  const { year, month } = currentSelected;

  const prevDate = new Date(year, month - 2); // month는 1부터 시작하므로 -2
  const prevYear = prevDate.getFullYear();
  const prevMonth = String(prevDate.getMonth() + 1).padStart(2, "0");
  const prevMonthIndex = prevDate.getMonth();

  saveSelectedMonth(`${prevYear}-${prevMonth}`);

  return {
    year: prevYear,
    month: prevMonth,
    monthText: MONTH_NAMES[prevMonthIndex],
  };
};

/**
 * 다음 달로 이동
 * @returns {object} 변경된 월 정보
 */
const goToNextMonth = () => {
  const currentSelected = getCurrentMonth();
  const { year, month } = currentSelected;

  const nextDate = new Date(year, month); // month는 1부터 시작하므로 그대로 사용
  const nextYear = nextDate.getFullYear();
  const nextMonth = String(nextDate.getMonth() + 1).padStart(2, "0");
  const nextMonthIndex = nextDate.getMonth();

  saveSelectedMonth(`${nextYear}-${nextMonth}`);

  return {
    year: nextYear,
    month: nextMonth,
    monthText: MONTH_NAMES[nextMonthIndex],
  };
};

// 내보내기
export {
  getCurrentMonth,
  saveSelectedMonth,
  resetSelectedMonth,
  goToPreviousMonth,
  goToNextMonth,
};
