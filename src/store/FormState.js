import Observable from "./Observable.js";
import { getDateYMD } from "../utils/date.js";
import DateState from "./DateState.js";

class FormState extends Observable {
  constructor() {
    super();
    this.formState = {
      date: DateState.getDate(),
      amount: "0",
      type: "withdraw",
      description: "",
      method: "",
      category: "",
      editId: null,
    };
  }
  setFormState(newFields) {
    this.formState = { ...this.formState, ...newFields };
    this.notify();
  }
  getFormState() {
    return this.formState;
  }
  resetFormState() {
    this.formState = {
      date: this.formState.date,
      amount: "0",
      type: "withdraw",
      description: "",
      method: "",
      category: "",
      editId: null,
    };
    this.notify();
  }
}

export default new FormState();
