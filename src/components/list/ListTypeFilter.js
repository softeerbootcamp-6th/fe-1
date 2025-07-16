import { EventDispatcher } from "../../utils/EventDispatcher.js";
import { ElementManager } from "../../utils/ElementManager.js";
import { ListFilter } from "../../utils/ListFilter.js";
import { NumberManager } from "../../utils/NumberManager.js";
import { listStore } from "../../store/ListStore.js";

export const ListTypeFilter = (type, totalMoney, entireFilter) => {
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

      listStore.dispatch("filterList", entireFilter);
    },
  });

  return listTypeFilter;
};
