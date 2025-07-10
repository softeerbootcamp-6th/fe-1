import { form } from "../components/form/index.js";

export const renderMain = (type = "doc") => {
  const main = document.createElement("main");
  main.id = "main";
  main.appendChild(form());
  return main;
};
