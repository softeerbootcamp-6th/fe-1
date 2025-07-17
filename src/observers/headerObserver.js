import { renderHeader } from "../components/header/HeaderView.js";
import DateState from "../store/DateState.js";
import NavBarState from "../store/NavBarState.js";

class HeaderObserver {
  constructor() {
    DateState.subscribe(this);
    NavBarState.subscribe(this);
  }

  update() {
    renderHeader();
  }
}

export function addHeaderObserver() {
  new HeaderObserver();
}
