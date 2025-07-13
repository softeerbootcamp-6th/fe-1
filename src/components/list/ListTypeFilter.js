import { ElementManager } from "../../utils/ElementManager.js";

export const ListTypeFilter = (type, isActive) => {
  const listTypeFilter = ElementManager.renderElement("div", "list-type");
  listTypeFilter.innerHTML = `
  <img src="./src/assets/checkbox.png" alt="checkbox"/>
  <span>${type === "income" ? "수입" : "지출"}</span>
  <span>0</span>
  `;
  return listTypeFilter;
};
