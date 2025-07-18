import NavBarState from "../store/NavBarState.js";
import { createMainLayout } from "../pages/main.js";
import { createCalendarLayout } from "../pages/calendar.js";
import { removeTransactionListObservers } from "./TransactionListObserver.js";
import { removeTransactionFormObservers } from "./transactionFormObservers.js";
import { removeCalendarObserver } from "./calendarObserver.js";

class LayoutObserver {
  update() {
    // 모든 옵저버 해제
    removeTransactionListObservers();
    removeTransactionFormObservers();
    removeCalendarObserver();

    const state = NavBarState.getNavBarState();
    console.log(`layout ${state} 으로 변경!!`);
    switch (state) {
      case "메인":
        createMainLayout();
        break;
      case "캘린더":
        createCalendarLayout();
        break;
      default:
        createMainLayout();
    }
  }
}

let layoutObserverInstance = null;

export function addLayoutObserver() {
  if (layoutObserverInstance) {
    NavBarState.unsubscribe(layoutObserverInstance);
  }
  layoutObserverInstance = new LayoutObserver();
  NavBarState.subscribe(layoutObserverInstance);
}

export function removeLayoutObserver() {
  if (layoutObserverInstance) {
    NavBarState.unsubscribe(layoutObserverInstance);
    layoutObserverInstance = null;
  }
}
