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

  // setup list wrpper
  const renderListWrapper = (data) => {
    listWrapper.innerHTML = ``;
    const groupedListByDate = ListFilter.groupTransactionsByDate(data);
    const groupedListKeys = Object.keys(groupedListByDate);
    groupedListKeys.map((key) => {
      listWrapper.appendChild(DateList(key, groupedListByDate[key]));
    });
  };

  // setup list overview
  const renderListOverview = (data) => {
    const listCounter = ElementManager.renderElement("div", "list-counter");
    listCounter.innerHTML = `
    <span>전체 내역</span>
    <span class="total-count">${data.length}건</span>
    `;
    listOverview.appendChild(listCounter);

    const listTypeFilterWrapper = ElementManager.renderElement(
      "div",
      "list-type-container"
    );
    const { income, expense } = NumberManager.calculateTotalMoney(data);
    listTypeFilterWrapper.appendChild(
      ListTypeFilter("income", income, data, moneyTypeFilter, renderListWrapper)
    );
    listTypeFilterWrapper.appendChild(
      ListTypeFilter(
        "expense",
        expense,
        data,
        moneyTypeFilter,
        renderListWrapper
      )
    );
    listOverview.appendChild(listTypeFilterWrapper);
  };

  // render list overview
  const listOverview = ElementManager.renderElement("div", "list-overview");
  list.appendChild(listOverview);
  renderListOverview(listStore.data);

  // render list wrapper
  const listWrapper = ElementManager.renderElement("div", "list-wrapper");
  list.appendChild(listWrapper);
  renderListWrapper(listStore.data);

  // rerender using dispatcher
  listStore.subscribe((newData) => {
    renderListWrapper(newData);
  });
  return list;
};
