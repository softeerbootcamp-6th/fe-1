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

let headerObserverInstance = null;

export function addHeaderObserver() {
  if (headerObserverInstance) {
    DateState.unsubscribe(headerObserverInstance);
    NavBarState.unsubscribe(headerObserverInstance);
  }
  headerObserverInstance = new HeaderObserver();
}

export function removeHeaderObserver() {
  if (headerObserverInstance) {
    DateState.unsubscribe(headerObserverInstance);
    NavBarState.unsubscribe(headerObserverInstance);
    headerObserverInstance = null;
  }
}
