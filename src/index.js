import { createLayout } from "./pages/Layout.js";
import { Router } from "./utils/router.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    createLayout();
    Router.setupRouter();
  } catch (error) {
    console.error("Error setting up layout:", error);
  }
});
