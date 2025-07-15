import { renderHeader } from "./HeaderView.js";
import { addObservers, state } from "../store.js";
import { addHeaderEvents } from "../controllers/headerController.js";

export function initHeader() {
  renderHeader(state);

  addObservers((state) => {
    renderHeader(state);
  });

  addHeaderEvents();
}
