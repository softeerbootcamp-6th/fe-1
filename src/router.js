import { renderMain } from "./components/Main.js";

export const routes = {
  doc: () => renderMain("doc"),
  calendar: () => renderMain("calendar"),
  chart: () => renderMain("chart"),
};

export const navigate = (route = "doc") => {
  // 기존의 것 삭제
  const app = document.querySelector("#app");
  const oldMain = document.querySelector("#main");
  if (oldMain) oldMain.remove();

  // 새로 생성
  const newMain = routes[route] ? renderMain(route) : renderMain("doc");
  app.appendChild(newMain);
};
