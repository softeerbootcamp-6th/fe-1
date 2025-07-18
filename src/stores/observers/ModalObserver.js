import { Observer } from "../../utils/index.js";

class ModalObserver extends Observer {
  constructor(view) {
    super();
    this.view = view;
  }

  update({ type, modalState }) {
    switch (type) {
      case "init":
        this.view.init();
        break;
      case "open":
        this.view.open(modalState);
        break;
      case "close":
        this.view.close();
        break;
    }
  }
}

export default ModalObserver;
