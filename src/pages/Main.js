import { EntireForm } from "../components/form/EntireForm.js";

export const renderMain = (type = "doc") => {
  const main = document.createElement("main");
  main.id = "main";
  main.appendChild(EntireForm());
  return main;
};
