import { renderMain } from "./components/Main.js";

export const routes = {
  doc: () => renderMain("doc"),
  calendar: () => renderMain("calendar"),
  chart: () => renderMain("chart"),
};

const renderRouter = () => {
  // 기존의 것 삭제
  const app = document.querySelector("#app");
  const oldMain = document.querySelector("#main");
  if (oldMain) oldMain.remove();

  // 새로 생성
  const path = window.location.pathname;
  const newMain = routes[path] ? renderMain(path) : renderMain("doc");
  app.appendChild(newMain);
};

// a 태그 이벤트 리스너 등록
document.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault(); // 기본 동작 방지

    const href = e.target.getAttribute("href");
    window.history.pushState({}, "", href);
    renderRouter();
  }
});

// 앞/뒤로 가기 버튼 이벤트 리스너 등록
window.addEventListener("popstate", renderRouter);

// 초기 렌더링
document.addEventListener("DOMContentLoaded", renderRouter);
