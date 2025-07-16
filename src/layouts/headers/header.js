import {
  updateMonth,
  setupTabListeners,
  setupMonthNavigation,
  switchTab,
} from "./header-ui-utils.js";

export function initHeader() {
  // 월 업데이트
  updateMonth();

  // 탭 리스너 설정
  setupTabListeners();

  // 월 네비게이션 설정
  setupMonthNavigation();

  // 초기 메인 페이지 로드
  switchTab("LIST_VIEW");
}
