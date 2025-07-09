import { renderInputBar } from "./inputBar.js";
import { renderHeader } from "./header.js";

const inputBarContainer = document.getElementById("input-bar-container");
const headerContainer = document.getElementById("header-container");

if (inputBarContainer) {
  renderInputBar(inputBarContainer);
}

if (headerContainer) {
  renderHeader(headerContainer);
}
