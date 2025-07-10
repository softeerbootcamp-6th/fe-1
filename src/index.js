import { createLayout } from "./components/Layout.js";
import { renderRouter } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    createLayout();
    renderRouter();
  } catch (error) {
    console.error("Error setting up layout:", error);
  }
});
