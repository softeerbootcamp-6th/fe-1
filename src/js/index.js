import router from "./router.js";
import { ModalView } from "../views/index.js";

import { modalState } from "../stores/subjects/index.js";
import { ModalObserver } from "../stores/observers/index.js";

document.addEventListener("DOMContentLoaded", () => {
  router.start();
});

// 전역에서 라우터 접근 가능하도록 설정
window.router = router;

const modalView = new ModalView();
const modalObserver = new ModalObserver(modalView);
modalState.subscribe(modalObserver);
modalState.init();
