import { renderHeader } from "./components/header.js";
import { render, navigate } from "./routes.js";

const headerContainer = document.getElementById("header-container");

if (headerContainer) {
  renderHeader(headerContainer);
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link && link.getAttribute("href")) {
      e.preventDefault();
      navigate(link.getAttribute("href"));
    }
  });

  render();
});
