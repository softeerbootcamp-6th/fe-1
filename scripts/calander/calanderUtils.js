import { elements } from "../elements.js";
import { dateStore } from "../../store/dateStore.js";
export const initCalanderHeader = () => {
  const calanderHeaderEl = elements.calanderHeaderEl();
  calanderHeaderEl.textContent = `${dateStore.getDate().year}년 ${dateStore.getDate().month}월`;
};
