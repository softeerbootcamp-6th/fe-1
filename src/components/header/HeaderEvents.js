import DateState from "../../store/DateState.js";
import NavBarState from "../../store/NavBarState.js";
import { formatYMD, parseYMD } from "../../utils/date.js";
import { addEvent } from "../../utils/addEvent.js";

export function initHeaderEvents() {
  addEvent({
    id: "header",
    event: "click",
    onEvent: (e) => {
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
    },
  });
}

function changeMonth(direction) {
  let { year, month, day } = parseYMD(DateState.getDate());
  if (direction === "prev") {
    month--;
    if (month < 1) {
      month = 12;
      year--;
    }
  } else if (direction === "next") {
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
  }
  DateState.setDate(formatYMD(year, month, day));
}

function changePage(page) {
  NavBarState.setNavBarState(page);

  if (page === "메인") location.hash = "";
  else if (page === "캘린더") location.hash = "calendar";
  else if (page === "차트") location.hash = "chart";
}
