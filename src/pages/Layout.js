import { renderHeader } from "./Header.js";
import { renderMain } from "./Main.js";
import { handleDate } from "../utils/handleDate.js";

export const createLayout = () => {
  const app = document.getElementById("app");

  // 전역 상태 관리 시스템 구현 필요 ⚠️
  const date = {
    year: 2023,
    month: 8,
    monthEng: "August",
  };

  const header = renderHeader(date);
  const main = renderMain();
  app.appendChild(header);
  app.appendChild(main);

  handleDate(date);
};
