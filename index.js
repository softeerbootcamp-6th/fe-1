import { renderHeader } from "./header.js";
import { render, navigate } from "./routes.js";

const headerContainer = document.getElementById("header-container");

if (headerContainer) {
  renderHeader(headerContainer);
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      const href = e.target.getAttribute("href");
      if (href) {
        navigate(href);
      }
    }
  });

  render();
});
