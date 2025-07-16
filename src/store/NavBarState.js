import Observable from "./Observable.js";

class NavBarState extends Observable {
  constructor() {
    super();
    this.navBarState = "메인"; // TODO - 기본 state를 URL 따라서 할 수 있도록 함수 추가
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
