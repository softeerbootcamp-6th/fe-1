import { renderHeader } from "./Header.js";
import { renderMain } from "./Main.js";

export const createLayout = () => {
  const app = document.getElementById("app");
  if (!app) {
    throw new Error("App element not found");
  }

  //header area
  const header = renderHeader();
  app.appendChild(header);

  //main area
  const main = renderMain();
  app.appendChild(main);
};
