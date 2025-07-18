import { ListApi } from "../api/ListApi.js";
import { EntireForm } from "../components/form/index.js";
import { List } from "../components/list/index.js";
import { listStore } from "../store/ListStore.js";
import { ElementManager } from "../utils/ElementManager.js";

export const renderDoc = () => {
  const doc = ElementManager.renderElementId("div", "doc");
  doc.appendChild(EntireForm());
  doc.appendChild(List());
  ListApi.getList().then((data) => {
    listStore.dispatch("initListItem", [...data]);
  });
  return doc;
};
