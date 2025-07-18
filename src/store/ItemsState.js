import { getItems } from "../apis/items.js";
import Observable from "./Observable.js";

class ItemsState extends Observable {
  constructor() {
    super();
    this.items;
  }

  async initItems() {
    try {
      const fetchedItems = await getItems();
      this.items = fetchedItems;
      this.notify();
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  setItems(newItems) {
    this.items = newItems;
    this.notify();
  }
  getItems() {
    return this.items;
  }
}

export default new ItemsState();
