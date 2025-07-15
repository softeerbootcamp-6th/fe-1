import Subject from "../utils/observers/Subject.js";

export class FormState extends Subject {
  constructor() {
    super();
    this.state = {
      id: null,
      date: new Date().toISOString().split("T")[0],
      type: "expense", // income, expense
      amount: 0,
      description: "",
      method: "",
      category: "",
    };
  }

  setField(field, value) {
    this.state[field] = value;
    this.notify(this.state);
  }

  setAll(fields) {
    this.state = { ...this.state, ...fields };
    this.notify(this.state);
  }

  reset() {
    this.state = {
      id: null,
      date: "",
      amount: "",
      category: "",
      memo: "",
      type: "expense",
    };
    this.notify(this.state);
  }

  getState() {
    return { ...this.state };
  }
}
