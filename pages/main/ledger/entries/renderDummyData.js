//js/input-form.js
import { renderCategoryOptions } from "../../../../components/inputForm/inputFormItems/categoryRender.js";
import { loadDummyEntries } from "../../../../components/inputForm/input-form-util.js";
import { store } from "../../../../store/store.js";

export function initRenderDummyData() {
  const { currentMonth, currentYear } = store.getState();
  const currentDate = `${currentYear}-${String(currentMonth).padStart(2, "0")}`;
  loadDummyEntries(currentDate);
  renderCategoryOptions();
}
