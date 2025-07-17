import router from "./router.js";
import modalState from "../stores/subjects/ModalState.js";
import { ModalView } from "../views/Modal/ModalView.js";
import { ModalObserver } from "../stores/observers/ModalObserver.js";

document.addEventListener("DOMContentLoaded", () => {
  router.start();
});

// 전역에서 라우터 접근 가능하도록 설정
window.router = router;

const modalView = new ModalView();
const modalObserver = new ModalObserver(modalView);
modalState.subscribe(modalObserver);
modalState.init();
