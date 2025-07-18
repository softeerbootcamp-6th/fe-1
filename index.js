import { renderHeader, initHeader } from "./components/header/header.js";
import { render, navigate } from "./utils/routes.js";
import { initStore, pathStore } from "./store/index.js";
import { renderModal, initModal, openModal } from "./components/modal/modal.js";

const headerContainer = document.getElementById("header-container");

if (headerContainer) {
  renderHeader(headerContainer);
  initHeader(headerContainer);
}

const modalContainer = document.getElementById("modal-container");

if (modalContainer) {
  //renderModal(modalContainer);
  //initModal(modalContainer);
  //openModal(modalContainer.querySelector(".modal"));
}

document.addEventListener("DOMContentLoaded", async () => {
  await initStore();
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
    pathStore.setPath(window.location.pathname);
  });
});
