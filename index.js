import { renderHeader } from "./header.js";
import { render } from "./routes.js";

const headerContainer = document.getElementById("header-container");

if (headerContainer) {
  renderHeader(headerContainer);
}

render();
