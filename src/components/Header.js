import { renderHeader } from "./headerView.js";
import DateState from "../store/DateState.js";
import { addHeaderEvents } from "../controllers/headerController.js";
import NavBarState from "../store/NavBarState.js";

export function initHeader() {
  renderHeader({
    curDate: DateState.getDate(),
    navBarState: NavBarState.getNavBarState(),
  });

  DateState.subscribe({
    update: () =>
      renderHeader({
        curDate: DateState.getDate(),
        navBarState: NavBarState.getNavBarState(),
      }),
  });
  NavBarState.subscribe({
    update: () =>
      renderHeader({
        curDate: DateState.getDate(),
        navBarState: NavBarState.getNavBarState(),
      }),
  });

  addHeaderEvents();
}
