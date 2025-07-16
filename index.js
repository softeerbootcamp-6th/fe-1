import { renderHeader, initHeader } from "./components/header.js";
import { render, navigate } from "./utils/routes.js";
import { initTransactionStore } from "./store/index.js";

const headerContainer = document.getElementById("header-container");

if (headerContainer) {
  renderHeader(headerContainer);
  initHeader(headerContainer);
}

document.addEventListener("DOMContentLoaded", async () => {
  await initTransactionStore();
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link && link.getAttribute("href")) {
      e.preventDefault();
      navigate(link.getAttribute("href"));
    }
  });
  //초기 렌더링
  render();
  //뒤로가기 시 렌더링
  window.addEventListener("popstate", () => {
    render();
  });
});
