import { ListApi } from "../api/ListApi.js";
import { EntireForm } from "../components/form/index.js";
import { List } from "../components/list/index.js";
import { listStore } from "../store/ListStore.js";
import { CacheManager } from "../utils/CacheManager.js";
import { ElementManager } from "../utils/ElementManager.js";

export const renderDoc = () => {
  const doc = ElementManager.renderElementId("div", "doc");
  doc.appendChild(EntireForm());
  doc.appendChild(List());
  // 초기 fetch
  CacheManager.fetchFromServer("list");
  return doc;
};
