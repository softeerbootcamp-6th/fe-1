import { DummyList } from "../../mocks/DummyList.js";
import { ElementManager } from "../../utils/ElementManager.js";
import { DayList } from "./DayList.js";
import { ListTypeFilter } from "./ListTypeFilter.js";

export const List = () => {
  const list = ElementManager.renderElement("div", "list");
  const moneyTypeFilter = {
    isExpenseTypeOpen: true,
    isIncomeTypeOpen: true,
  };

  // list overview
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
  listTypeFilterWrapper.appendChild(ListTypeFilter("income", moneyTypeFilter));
  listTypeFilterWrapper.appendChild(ListTypeFilter("expense", moneyTypeFilter));
  listOverview.appendChild(listTypeFilterWrapper);
  list.appendChild(listOverview);

  // list wrpper
  const listWrapper = ElementManager.renderElement("div", "list-wrapper");
  listWrapper.appendChild(DayList(DummyList));
  list.appendChild(listWrapper);
  return list;
};
