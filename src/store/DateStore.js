import { Store } from "./store.js";

class DateStore extends Store {
  constructor(initData) {
    super(initData);
  }

  // dispatcher 패턴으로 render 함수 호출하여 실행
  dispatch(newData) {
    this.data = newData;
    this.notify();
  }
}

export const dateStore = new DateStore(Date().now());
