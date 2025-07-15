import { EventDispatcher } from "../../store/EventBusStore.js";
import { ElementManager } from "../../utils/ElementManager.js";
import { ListFilter } from "../../utils/ListFilter.js";
import { NumberManager } from "../../utils/NumberManager.js";

export const ListTypeFilter = (
  type,
  totalMoney,
  groupedListByMonth,
  entireFilter,
  renderListWrapper
) => {
  const listTypeFilter = ElementManager.renderElement(
    "div",
    `list-type-${type}`
  );
  listTypeFilter.innerHTML = `
  <img src="./src/assets/checkbox.png" alt="checkbox"/>
  <span>${type === "income" ? "수입" : "지출"}</span>
  <span>${NumberManager.parseToCommaNumber(totalMoney)}</span>
  `;

  EventDispatcher.register({
    eventType: "click",
    selector: `list-type-${type}`,
    handler: () => {
      // 필터링 화면 업데이트
      let isActive = false;
      console.log(type);
      if (type === "income") {
        entireFilter.isIncomeTypeOpen = !entireFilter.isIncomeTypeOpen;
        isActive = entireFilter.isIncomeTypeOpen;
      } else {
        entireFilter.isExpenseTypeOpen = !entireFilter.isExpenseTypeOpen;
        isActive = entireFilter.isExpenseTypeOpen;
      }
      const listTypeFilterImg = listTypeFilter.querySelector("img");
      listTypeFilterImg.src = `./src/assets/${
        isActive ? "checkbox" : "uncheckbox"
      }.png`;

      // 내역 데이터 업데이트
      const updatedTransactioin = ListFilter.groupTransactionsByMoneyType(
        groupedListByMonth,
        entireFilter
      );

      // 내역 개요 화면 업데이트
      const listOverviewCounter = document.querySelector(
        ".list-overview > .list-counter > .total-count"
      );
      listOverviewCounter.textContent = updatedTransactioin.length + "건";

      // 내역 화면 업데이트
      renderListWrapper(updatedTransactioin);
    },
  });

  return listTypeFilter;
};
