import { updateMonth, setupMonthNavigation } from "./header-ui-utils.js";
import {
  setupRoutingSubscription,
  setupTabListeners,
} from "../../store/routing-store.js";

export function initHeader() {
  // 라우팅 구독 설정
  setupRoutingSubscription();

  // 월 업데이트
  updateMonth();

  // 탭 리스너 설정
  setupTabListeners();

  // 월 네비게이션 설정
  setupMonthNavigation();
}
