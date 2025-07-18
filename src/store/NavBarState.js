import Observable from "./Observable.js";

class NavBarState extends Observable {
  constructor() {
    super();

    const hash = location.hash.replace("#", "");
    switch (hash) {
      case "":
        this.navBarState = "메인";
        break;
      case "calendar":
        this.navBarState = "캘린더";
        break;
      case "chart":
        this.navBarState = "차트";
        break;
      default:
        this.navBarState = "메인";
    }
  }

  setNavBarState(newState) {
    this.navBarState = newState;
    this.notify();
  }
  getNavBarState() {
    return this.navBarState;
  }
}

export default new NavBarState();
