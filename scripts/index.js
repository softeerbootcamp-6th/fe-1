import { loadPage } from "./router.js";
import { initializeHeader } from "./header.js";
import {
  elements,
  initToggleButton,
  getInputValues,
  initPaymentDropdown,
  initCategoryDropdown,
} from "./input.js";

window.addEventListener("DOMContentLoaded", async () => {
  const headerEl = document.getElementById("header");
  const res = await fetch("./components/header.html");
  const html = await res.text();
  headerEl.innerHTML = html;
  initializeHeader();
  await loadPage();
  initToggleButton();
  initCategoryDropdown();
  initPaymentDropdown();
  getInputValues();
});

window.addEventListener("hashchange", loadPage);
