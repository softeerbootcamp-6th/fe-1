import { setState, state } from "../store.js";
import { parseYMD, formatYMD } from "../utils/date.js";

export function changeMonth(direction) {
  let { year, month, day } = parseYMD(state.curDate);
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
  setState({ curDate: formatYMD(year, month, day) });
}

export function changePage(page) {
  setState({ navBarState: page });

  if (page === "메인") location.hash = "";
  else if (page === "캘린더") location.hash = "calendar";
  else if (page === "차트") location.hash = "chart";
}
