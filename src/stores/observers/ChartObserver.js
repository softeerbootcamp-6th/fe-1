import { Observer } from "../../utils/index.js";

class ChartObserver extends Observer {
  constructor(view) {
    super();
    this.view = view;
  }

  update({ transactions }) {
    this.view.render({ transactions });
  }
}

export default ChartObserver;
