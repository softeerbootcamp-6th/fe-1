import { addHeaderObserver } from "../../observers/headerObserver.js";
import { initHeaderEvents } from "./HeaderEvents.js";
import { renderHeader } from "./HeaderView.js";

export function initHeader() {
  renderHeader();
  addHeaderObserver();
  initHeaderEvents();
}
