import { ElementManager } from "../../utils/ElementManager.js";
import { ListFilter } from "../../utils/ListFilter.js";

export const ListTypeFilter = (
  type,
  groupedListByMonth,
  entireFilter,
  renderListWrapper
) => {
  const listTypeFilter = ElementManager.renderElement("div", "list-type");
  listTypeFilter.innerHTML = `
  <img src="./src/assets/checkbox.png" alt="checkbox"/>
  <span>${type === "income" ? "수입" : "지출"}</span>
  <span>0</span>
  `;

  listTypeFilter.addEventListener("click", () => {
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
  });
  return listTypeFilter;
};
