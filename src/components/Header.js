import { renderHeader } from "./headerView.js";
import DateState from "../store/DateState.js";
import { addHeaderEvents } from "../controllers/headerController.js";
import NavBarState from "../store/NavBarState.js";
import HeaderObserver from "../observers/headerObserver.js";

export function initHeader() {
  renderHeader({
    curDate: DateState.getDate(),
    navBarState: NavBarState.getNavBarState(),
  });

  HeaderObserver;

  addHeaderEvents();
}
