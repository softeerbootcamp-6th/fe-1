import { renderHeader } from "./Header.js";
import { renderMain } from "./Main.js";
import { handleDate } from "../utils/handleDate.js";

export const createLayout = () => {
  const app = document.getElementById("app");
  app.classList.add("light-14");
  if (!app) {
    throw new Error("App element not found");
  }

  const date = {
    year: 2023,
    month: 8,
    monthEng: "August",
  };

  //header area
  const header = renderHeader(date);
  app.appendChild(header);

  //main area
  const main = renderMain();
  app.appendChild(main);

  handleDate(date);
};
