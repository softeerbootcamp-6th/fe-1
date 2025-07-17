import Observer from "../../utils/observers/Observer.js";

export class InputFormObserver extends Observer {
  constructor(view) {
    super();
    this.view = view;
  }

  update({ type, state }) {
    // all, date, type, amount, description, method, category
    switch (type) {
      case "all":
        this.view.render(state);
        break;
      case "date":
        break;
      case "type":
        this.view.renderType(state);
        break;
      case "amount":
        this.view.renderAmount(state);
        break;
      case "description":
        this.view.renderDescription(state);
        break;
      case "method":
        this.view.renderMethod(state);
        break;
      case "category":
        this.view.renderCategory(state);
        break;
      case "validate":
        this.view.renderValidate(state);
        break;
      default:
        this.view.render(state);
    }
  }
}
