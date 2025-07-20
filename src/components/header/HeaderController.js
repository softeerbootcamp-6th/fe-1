import { addHeaderObserver } from "../../observers/headerObserver.js";
import { addLayoutObserver } from "../../observers/layoutObserver.js";
import { initHeaderEvents } from "./HeaderEvents.js";
import { renderHeader } from "./HeaderView.js";

export function initHeader() {
  renderHeader();
  addHeaderObserver();
  addLayoutObserver();
  initHeaderEvents();
}
