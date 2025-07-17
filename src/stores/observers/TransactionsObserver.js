import Observer from "../../utils/observers/Observer.js";

export class TransactionsObserver extends Observer {
  constructor(view) {
    super();
    this.view = view;
  }

  update(state) {
    this.view.render(state);
  }
}
