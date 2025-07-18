import { ElementManager } from "../../utils/ElementManager.js";
import { NumberManager } from "../../utils/NumberManager.js";
import { ListFilter } from "../../utils/ListFilter.js";
import { DateList } from "./DateList.js";
import { ListTypeFilter } from "./ListTypeFilter.js";
import { listStore } from "../../store/ListStore.js";

export const List = () => {
  const list = ElementManager.renderElement("div", "list");

  // setup list wrpper
  const renderListWrapper = (data) => {
    listWrapper.innerHTML = ``;
    const groupedListByDate = ListFilter.groupTransactionsByDate(data);
    const groupedListKeys = Object.keys(groupedListByDate);
    groupedListKeys.map((key) => {
      listWrapper.appendChild(DateList(key, groupedListByDate[key]));
    });
  };

  // setup list overview counter
  const renderListOverviewCounter = (data) => {
    listCounter.innerHTML = `
    <span>전체 내역</span>
    <span class="total-count">${data.length}건</span>
    `;
  };

  const renderListOverviewFilter = (data) => {
    listTypeFilterWrapper.innerHTML = ``;
    const { income, expense } = NumberManager.calculateTotalMoney(data);
    listTypeFilterWrapper.appendChild(ListTypeFilter("income", income));
    listTypeFilterWrapper.appendChild(ListTypeFilter("expense", expense));
  };

  // render list overview
  const listOverview = ElementManager.renderElement("div", "list-overview");
  const listCounter = ElementManager.renderElement("div", "list-counter");
  listOverview.appendChild(listCounter);
  renderListOverviewCounter(listStore.viewData);

  const listTypeFilterWrapper = ElementManager.renderElement(
    "div",
    "list-type-container"
  );
  renderListOverviewFilter(listStore.viewData);
  listOverview.appendChild(listTypeFilterWrapper);
  list.appendChild(listOverview);

  // render list wrapper
  const listWrapper = ElementManager.renderElement("div", "list-wrapper");
  list.appendChild(listWrapper);
  renderListWrapper(listStore.viewData);

  // rerender using dispatcher
  // 데이터가 업데이트되는 화면만 부분 렌더링
  listStore.subscribe((newData) => {
    renderListOverviewCounter(newData);
    renderListOverviewFilter(newData);
    renderListWrapper(newData);
  });
  return list;
};
