import { Subject } from "../../utils/index.js";

class ModalState extends Subject {
  constructor() {
    super();
    this.modalState = {
      isOpen: false,
      type: "",
      title: "",
      content: "",
      onConfirm: () => {},
    };
  }

  init() {
    this.notify({ type: "init", modalState: this.modalState });
  }

  openModal({ type, title, content, onConfirm }) {
    this.modalState = {
      isOpen: true,
      type,
      title,
      content,
      onConfirm,
    };
    this.notify({ type: "open", modalState: this.modalState });
  }

  closeModal() {
    this.modalState = {
      isOpen: false,
      type: "",
      title: "",
      content: "",
      onConfirm: () => {},
    };
    this.notify({ type: "close", modalState: this.modalState });
  }
}

const modalState = new ModalState();
export default modalState;
