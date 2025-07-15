import { renderMain } from "../pages/Main.js";

export const Router = {
  renderRouter: () => {
    // 기존의 것 삭제
    const app = document.querySelector("#app");
    const oldMain = document.querySelector("#main");
    if (oldMain) oldMain.remove();

    // 새로 생성
    const path = window.location.pathname;
    const splitPath = path === "/" ? "doc" : path.replace("/", "");
    const newMain = renderMain(splitPath);
    app.appendChild(newMain);

    // 활성화된 페이지 표현
    const target = document.querySelector(
      `.nav-item[data-path="${splitPath}"]`
    );
    if (!target) return; // 해당 페이지가 없으면 종료

    const current = document.querySelector(".nav > .active");
    if (current) current.classList.remove("active");
    target.classList.add("active");
  },
  setupRouter: () => {
    // 태그 클릭시 페이지 이동 이벤트 리스너 등록
    const header = document.querySelector("#header");
    header.addEventListener("click", (e) => {
      if (e.target.closest(".nav-item")) {
        e.preventDefault(); // a태그 새로고침 기능 제한
        const navItem = e.target.closest(".nav-item");
        const href = navItem.getAttribute("href");
        window.history.pushState({}, "", href);
        Router.renderRouter();
      }
      if (e.target.closest(".logo")) {
        window.history.pushState({}, "", "/");
        Router.renderRouter();
      }
    });

    // 앞/뒤로가기 버튼 이벤트 리스너 등록
    window.addEventListener("popstate", Router.renderRouter);
  },
};
