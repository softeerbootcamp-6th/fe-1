import { EntireForm } from "../components/form/index.js";
import { List } from "../components/list/index.js";
import { ElementManager } from "../utils/ElementManager.js";

export const renderDoc = () => {
  const doc = ElementManager.renderElementId("div", "doc");
  doc.appendChild(EntireForm());
  doc.appendChild(List());
  return doc;
};
