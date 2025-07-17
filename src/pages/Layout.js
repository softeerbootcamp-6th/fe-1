import { renderHeader } from "./Header.js";
import { renderMain } from "./Main.js";

export const createLayout = () => {
  const app = document.getElementById("app");

  const header = renderHeader();
  const main = renderMain();
  app.appendChild(header);
  app.appendChild(main);
};
