import { EventDispatcher } from "../../utils/EventDispatcher.js";
import { ElementManager } from "../../utils/ElementManager.js";
import { NumberManager } from "../../utils/NumberManager.js";
import { listStore } from "../../store/ListStore.js";

export const ListTypeFilter = (type, totalMoney) => {
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
      // 전체 내역 리스트 화면 업데이트
      listStore.dispatch("filterList", type);

      // 필터링 화면 업데이트
      const listTypeFilterImg = listTypeFilter.querySelector("img");
      listTypeFilterImg.src = `./src/assets/${
        listStore.moneyTypeFilter[type] ? "checkbox" : "uncheckbox"
      }.png`;
    },
  });

  return listTypeFilter;
};
