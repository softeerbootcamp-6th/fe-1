import { ElementManager } from "../../utils/ElementManager.js";
import { ListTypeFilter } from "./ListTypeFilter.js";

export const List = () => {
  const list = ElementManager.renderElement("div", "list");

  const listOverview = ElementManager.renderElement("div", "list-overview");
  const listCounter = ElementManager.renderElement("div", "list-counter");
  listCounter.innerHTML = `
    <span>전체 내역</span>
    <span>0건</span>
    `;
  listOverview.appendChild(listCounter);

  const listTypeFilterWrapper = ElementManager.renderElement(
    "div",
    "list-type-container"
  );
  listTypeFilterWrapper.appendChild(ListTypeFilter("income"));
  listTypeFilterWrapper.appendChild(ListTypeFilter("expense"));
  listOverview.appendChild(listTypeFilterWrapper);
  list.appendChild(listOverview);
  return list;
};
