import Observer from "../../utils/observers/Observer.js";

export class TransactionsInfo extends Observer {
  constructor(view) {
    super();
    this.view = view;
  }

  update(state) {
    this.view.render(state);
  }
}
