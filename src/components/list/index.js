import { DummyList } from "../../mocks/DummyList.js";
import { ElementManager } from "../../utils/ElementManager.js";
import { NumberManager } from "../../utils/NumberManager.js";
import { ListFilter } from "../../utils/ListFilter.js";
import { DateList } from "./DateList.js";
import { ListTypeFilter } from "./ListTypeFilter.js";
import { listStore } from "../../store/ListStore.js";

export const List = () => {
  const list = ElementManager.renderElement("div", "list");
  const moneyTypeFilter = {
    isExpenseTypeOpen: true,
    isIncomeTypeOpen: true,
  };

  const groupedListByMonth = ListFilter.groupTransactionsByMonth(DummyList, 8);
  const groupedListByMoneyType = ListFilter.groupTransactionsByMoneyType(
    groupedListByMonth,
    moneyTypeFilter
  );

  // setup list wrpper
  const renderListWrapper = (data) => {
    listWrapper.innerHTML = ``;
    const groupedListByDate = ListFilter.groupTransactionsByDate(data);
    const groupedListKeys = Object.keys(groupedListByDate);
    groupedListKeys.map((key) => {
      listWrapper.appendChild(DateList(key, groupedListByDate[key]));
    });
  };

  // list overview
  const listOverview = ElementManager.renderElement("div", "list-overview");
  const listCounter = ElementManager.renderElement("div", "list-counter");
  listCounter.innerHTML = `
    <span>전체 내역</span>
    <span class="total-count">${groupedListByMonth.length}건</span>
    `;
  listOverview.appendChild(listCounter);

  const listTypeFilterWrapper = ElementManager.renderElement(
    "div",
    "list-type-container"
  );
  const totalMoney = NumberManager.calculateTotalMoney(groupedListByMoneyType);
  listTypeFilterWrapper.appendChild(
    ListTypeFilter(
      "income",
      totalMoney.income,
      groupedListByMonth,
      moneyTypeFilter,
      renderListWrapper
    )
  );
  listTypeFilterWrapper.appendChild(
    ListTypeFilter(
      "expense",
      totalMoney.expense,
      groupedListByMonth,
      moneyTypeFilter,
      renderListWrapper
    )
  );
  listOverview.appendChild(listTypeFilterWrapper);
  list.appendChild(listOverview);

  // render list wrapper
  const listWrapper = ElementManager.renderElement("div", "list-wrapper");
  list.appendChild(listWrapper);
  renderListWrapper(groupedListByMoneyType);

  // rerender using dispatcher
  listStore.subscribe(() => {
    console.log("mememe");
  });
  return list;
};
