import router from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  router.start();
});

// 전역에서 라우터 접근 가능하도록 설정
window.router = router;
