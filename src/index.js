import { createLayout } from "./components/Layout.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    createLayout();
  } catch (error) {
    console.error("Error setting up layout:", error);
  }
});
