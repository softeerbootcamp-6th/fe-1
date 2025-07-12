import { EntireForm } from "../components/form/index.js";
import { ElementManager } from "../utils/ElementManager.js";

export const renderMain = (type = "doc") => {
  const main = ElementManager.renderElementId("main", "main");
  main.appendChild(EntireForm());
  main.appendChild(ElementManager.renderElement("div", ["test", "A"], type));
  return main;
};
