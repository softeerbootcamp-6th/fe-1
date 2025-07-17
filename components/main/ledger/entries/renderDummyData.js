//js/input-form.js
import { renderCategoryOptions } from "../../../inputForm/inputFormItems/categoryRender.js";
import { currentMonth, currentYear } from "../../../header/dateRender.js";
import { loadDummyEntries } from "../../../inputForm/input-form-util.js";

export function initRenderDummyData() {
  const currentDate = `${currentYear}-${String(currentMonth).padStart(2, "0")}`;
  loadDummyEntries(currentDate);
  renderCategoryOptions();
}
