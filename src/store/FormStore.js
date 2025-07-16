import { Store } from "./store.js";

const initialFormInput = {
  mode: "create",
  date: new Date(),
  moneyType: "expense",
  money: "",
  content: "",
  payment: "",
  category: "",
  uid: null,
};

class FormStore extends Store {
  constructor(input) {
    super({ ...input });
  }

  dispatch(type, newItem) {
    switch (type) {
      case "reset":
        this.data = { ...initialFormInput, date: new Date() };
        break;
      case "update":
        this.data = {
          ...this.data,
          ...newItem,
        };
        break;
      case "edit":
        this.data = {
          ...newItem,
          mode: "edit",
          date: new Date(newItem.date),
          uid: newItem.uid,
        };
        break;
    }
    this.notify();
  }
}

export const formStore = new FormStore(initialFormInput);
