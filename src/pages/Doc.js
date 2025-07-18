import { ListApi } from "../api/ListApi.js";
import { EntireForm } from "../components/form/index.js";
import { List } from "../components/list/index.js";
import { listStore } from "../store/ListStore.js";
import { cacheManager } from "../utils/CacheManager.js";
import { ElementManager } from "../utils/ElementManager.js";

export const renderDoc = () => {
  const doc = ElementManager.renderElementId("div", "doc");
  doc.appendChild(EntireForm());
  doc.appendChild(List());

  cacheManager.fetch({
    key: "list",
    fetchFn: () => ListApi.getList(),
    onSuccess: (data) => listStore.dispatch("initListItem", data),
  });
  return doc;
};
