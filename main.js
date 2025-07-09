import { renderHeader } from "./components/Header.js";

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const header = renderHeader();
  app.appendChild(header);
});
