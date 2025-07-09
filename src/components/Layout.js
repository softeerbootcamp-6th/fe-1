import { createHeader } from "./Header.js";
import { createMain } from "./Main.js";

export const createLayout = () => {
  const app = document.getElementById("app");
  if (!app) {
    throw new Error("App element not found");
  }

  //header area
  const header = createHeader();
  app.appendChild(header);

  //main area
  const main = createMain();
  app.appendChild(main);
};
