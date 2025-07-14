import { ElementManager } from "../../utils/ElementManager.js";

export const ListTypeFilter = (type, entireFiler) => {
  const listTypeFilter = ElementManager.renderElement("div", "list-type");
  listTypeFilter.innerHTML = `
  <img src="./src/assets/checkbox.png" alt="checkbox"/>
  <span>${type === "income" ? "수입" : "지출"}</span>
  <span>0</span>
  `;

  listTypeFilter.addEventListener("click", (e) => {
    let isActive = false;
    if (type === "income") {
      entireFiler.isIncomeTypeOpen = !entireFiler.isIncomeTypeOpen;
      isActive = entireFiler.isIncomeTypeOpen;
    } else {
      entireFiler.isExpenseTypeOpen = !entireFiler.isExpenseTypeOpen;
      isActive = entireFiler.isExpenseTypeOpen;
    }
    const listTypeFilterImg = listTypeFilter.querySelector("img");
    listTypeFilterImg.src = `./src/assets/${
      isActive ? "checkbox" : "uncheckbox"
    }.png`;
  });
  return listTypeFilter;
};
