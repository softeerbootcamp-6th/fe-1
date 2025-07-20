import { EventDispatcher } from "../../utils/EventDispatcher.js";
import { ElementManager } from "../../utils/ElementManager.js";
import { NumberManager } from "../../utils/NumberManager.js";
import { listStore } from "../../store/ListStore.js";

export const ListTypeFilter = (type, totalMoney) => {
  const listTypeFilter = ElementManager.renderElement(
    "div",
    `list-type-${type}`
  );

  // 초기 렌더링 시 현재 필터 상태를 반영
  const updateFilterDisplay = () => {
    const isActive = listStore.moneyTypeFilter[type];
    listTypeFilter.innerHTML = `
      <img src="./src/assets/${
        isActive ? "checkbox" : "uncheckbox"
      }.png" alt="checkbox"/>
      <span>${type === "income" ? "수입" : "지출"}</span>
      <span>${NumberManager.parseToCommaNumber(totalMoney)}</span>
    `;
  };

  // 초기 렌더링
  updateFilterDisplay();

  EventDispatcher.register({
    eventType: "click",
    selector: `list-type-${type}`,
    handler: () => {
      // 전체 내역 리스트 화면 업데이트
      listStore.dispatch("filterList", type);

      // 필터링 화면 업데이트 - dispatch 후 현재 상태를 읽어와서 업데이트
      const isActive = listStore.moneyTypeFilter[type];
      const listTypeFilterImg = listTypeFilter.querySelector("img");
      listTypeFilterImg.src = `./src/assets/${
        isActive ? "checkbox" : "uncheckbox"
      }.png`;
    },
  });

  return listTypeFilter;
};
