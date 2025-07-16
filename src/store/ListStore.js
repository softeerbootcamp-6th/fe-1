import { DummyList } from "../mocks/DummyList.js";
import { Store } from "./store.js";

class ListStore extends Store {
  constructor(initData) {
    super(initData);
  }

  // dispatcher 패턴으로 render 함수 호출하여 실행
  dispatch(type, newItem) {
    console.log(this.data);
    switch (type) {
      case "addListItem":
        this.data.push(newItem);
        break;
      case "removeListItemByUID":
        this.data = this.data.filter((partData) => partData.uid !== newItem);
        break;
      case "filterList":
        // this.data=this.data.filter(())
        break;
    }
    console.log(this.data);
    this.notify();
  }
}

export const listStore = new ListStore(DummyList);
