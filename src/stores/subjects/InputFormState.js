import Subject from "../../utils/observers/Subject.js";

export class InputFormState extends Subject {
  constructor() {
    super();
    this.updateId = null;
    this.state = {
      date: new Date().toISOString().split("T")[0],
      type: "expense", // income, expense
      amount: 0,
      description: "",
      method: "",
      category: "",
    };
    this.isValidate = false;
  }

  init() {
    this.validate();
    this.notify({
      type: "all",
      state: { ...this.state, isValidate: this.isValidate },
    });
  }

  validate() {
    const prevIsValidate = this.isValidate;
    const { date, amount, description, method, category } = this.state;
    if (date && amount && description && method && category) {
      this.isValidate = true;
    } else {
      this.isValidate = false;
    }
    if (prevIsValidate !== this.isValidate) {
      this.notify({ type: "validate", state: this.isValidate });
    }
  }

  setField(field, value) {
    this.state[field] = value;
    this.validate();
    this.notify({ type: field, state: this.state });
  }

  toggleType() {
    this.state.type = this.state.type === "income" ? "expense" : "income";
    this.state.category = "";
    this.validate();
    this.notify({ type: "type", state: this.state });
  }

  setAll(state) {
    this.state = state;
    this.init();
  }

  setUpdateId(id) {
    this.updateId = id;
  }

  reset() {
    this.updateId = null;
    this.state = {
      date: new Date().toISOString().split("T")[0],
      type: "expense", // income, expense
      amount: 0,
      description: "",
      method: "",
      category: "",
    };
    this.isValidate = false;
    this.notify({ type: "all", state: this.state });
  }

  getState() {
    return { ...this.state };
  }
}
