import { renderHeader } from "../components/headerView.js";
import DateState from "../store/DateState.js";
import NavBarState from "../store/NavBarState.js";

class HeaderObserver {
  constructor() {
    DateState.subscribe(this);
    NavBarState.subscribe(this);
  }

  update() {
    renderHeader({
      curDate: DateState.getDate(),
      navBarState: NavBarState.getNavBarState(),
    });
  }
}

export default new HeaderObserver();
