//js/input-form.js
import { renderCategoryOptions } from "./categoryRender.js";
import { currentMonth, currentYear } from "./header.js";
import { loadDummyEntries } from "../../components/inputForm/input-form-util.js";

export function initRenderDummyData() {
  const currentDate = `${currentYear}-${String(currentMonth).padStart(2, "0")}`;
  loadDummyEntries(currentDate);
  renderCategoryOptions();
}
