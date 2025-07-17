import { createLayout } from "./pages/Layout.js";
import { EventDispatcher } from "./utils/EventDispatcher.js";
import { Router } from "./utils/router.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    createLayout();
    Router.setupRouter();
    document.addEventListener("click", (e) => EventDispatcher.dispatch(e));
    document.addEventListener("input", (e) => EventDispatcher.dispatch(e));
  } catch (error) {
    console.error("Error setting up layout:", error);
  }
});
