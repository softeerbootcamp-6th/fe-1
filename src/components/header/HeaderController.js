import headerObserver from "../../observers/headerObserver.js";
import DateState from "../../store/DateState.js";
import NavBarState from "../../store/NavBarState.js";
import { initHeaderEvents } from "./HeaderEvents.js";

export function initHeader() {
  DateState.initDate();
  NavBarState.initNavBarState(); // TODO - url에 따라서 초기 상태 변경하기 constructor에서

  headerObserver;
  initHeaderEvents();
}
