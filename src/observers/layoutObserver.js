import { createCalendarLayout } from "../pages/calendar.js";
import { createMainLayout } from "../pages/main.js";
import NavBarState from "../store/NavBarState.js";

class LayoutObserver {
  constructor() {
    NavBarState.subscribe(this);
  }

  update() {
    const layout = NavBarState.getNavBarState();
    switch (layout) {
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

export function addLayoutObserver() {
  new LayoutObserver();
}
