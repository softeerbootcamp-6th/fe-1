import { DummyList } from "../../mocks/DummyList.js";
import { ElementManager } from "../../utils/ElementManager.js";
import { ListFilter } from "../../utils/ListFilter.js";
import { DateList } from "./DateList.js";
import { ListTypeFilter } from "./ListTypeFilter.js";

export const List = () => {
  const list = ElementManager.renderElement("div", "list");
  const moneyTypeFilter = {
    isExpenseTypeOpen: true,
    isIncomeTypeOpen: true,
  };
  const groupedListByMonth = ListFilter.groupTransactionsByMonth(DummyList, 8);

  // list overview
  const listOverview = ElementManager.renderElement("div", "list-overview");
  const listCounter = ElementManager.renderElement("div", "list-counter");
  listCounter.innerHTML = `
    <span>전체 내역</span>
    <span>${groupedListByMonth.length}건</span>
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
  const groupedListByDate =
    ListFilter.groupTransactionsByDate(groupedListByMonth);
  const groupedListKeys = Object.keys(groupedListByDate);
  groupedListKeys.map((key) => {
    listWrapper.appendChild(DateList(key, groupedListByDate[key]));
  });
  list.appendChild(listWrapper);
  return list;
};
