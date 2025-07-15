import { changeMonth, changePage } from "../actions/headerActions.js";

export function addHeaderEvents() {
  document.addEventListener("click", (e) => {
    if (e.target.closest(".header-arrow-left")) {
      changeMonth("prev");
    }
    if (e.target.closest(".header-arrow-right")) {
      changeMonth("next");
    }
    const btn = e.target.closest(".header-menu-icon");
    if (btn) {
      const page = btn.getAttribute("data-page");
      changePage(page);
    }
  });
}
