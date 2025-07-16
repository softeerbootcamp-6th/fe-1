import { items as DummyItems } from "../constants/items.js";
import Observable from "./Observable.js";

class ItemsState extends Observable {
  constructor() {
    super();
    this.items = DummyItems;
  }

  setItems(newItems) {
    this.items = newItems;
    this.notify();
  }

  getItems() {
    return this.items;
  }
}

const itemsState = new ItemsState();
export default itemsState;
