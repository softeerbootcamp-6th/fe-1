import { Subject } from "../../utils/index.js";
import {
  getTransactionMethod,
  postTransactionMethod,
  delTransactionMethod,
} from "../../apis/transaction.js";

class InputFormState extends Subject {
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
    this.methodList = [];
    this.isValidate = false;
  }

  async init() {
    this.validate();
    this.methodList = await getTransactionMethod();
    this.notify({
      type: "all",
      state: {
        ...this.state,
        methodList: this.methodList,
        isValidate: this.isValidate,
      },
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

  getState() {
    return { ...this.state };
  }

  setField(field, value) {
    this.state[field] = value;
    this.validate();
    this.notify({
      type: field,
      state: { ...this.state, methodList: this.methodList },
    });
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

  async reset() {
    this.updateId = null;
    this.state = {
      date: new Date().toISOString().split("T")[0],
      type: "expense", // income, expense
      amount: 0,
      description: "",
      method: "",
      category: "",
    };
    this.methodList = await getTransactionMethod();
    this.isValidate = false;
    this.notify({
      type: "all",
      state: { ...this.state, methodList: this.methodList },
    });
  }

  async addMethod(method) {
    await postTransactionMethod(method);
    this.methodList.push(method);
    this.notify({
      type: "method",
      state: { ...this.state, methodList: this.methodList },
    });
  }

  async deleteMethod(method) {
    await delTransactionMethod(method);
    this.methodList = this.methodList.filter((m) => m !== method);
    this.notify({
      type: "method",
      state: { ...this.state, methodList: this.methodList },
    });
  }
}

const inputFormState = new InputFormState();
export default inputFormState;
