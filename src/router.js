import { renderMain } from "./pages/Main.js";

export const renderRouter = () => {
  // 기존의 것 삭제
  const app = document.querySelector("#app");
  const oldMain = document.querySelector("#main");
  if (oldMain) oldMain.remove();

  // 새로 생성
  const hash = window.location.hash || "#doc"; // #을 제거하고 기본값 설정
  const newMain = renderMain(hash.replace("#", ""));
  app.appendChild(newMain);
};

// a 태그 이벤트 리스너 등록
window.addEventListener("click", (e) => {
  if (e.target.tagName === "A" && e.target.classList.contains("nav")) {
    e.preventDefault(); // 기본 동작 방지
    const href = e.target.getAttribute("href");
    window.location.hash = href;
  }
});

// 해시 변경 이벤트 리스너 등록
window.addEventListener("hashchange", renderRouter);
