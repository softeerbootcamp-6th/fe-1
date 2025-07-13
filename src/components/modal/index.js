import { ElementManager } from "../../utils/ElementManager.js";

export const Modal = {
  renderModal: () => {
    const modal = ElementManager.renderElement("div", "modal");
    return modal;
  },
  hideModal: () => {},
};
