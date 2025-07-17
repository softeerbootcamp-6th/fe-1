import { Observer } from "../../utils/index.js";

class TransactionsObserver extends Observer {
  constructor(view) {
    super();
    this.view = view;
  }

  update(state) {
    this.view.render(state);
  }
}

export default TransactionsObserver;
