// js/index.js
import { initCalendar } from "./function/header.js";
import { initRenderDummyData } from "./function/renderDummyData.js";
import { initListener } from "./listener/totalListener.js";
import { deleteEntries } from "./function/entry/entry.js";
import { initFilterButtons } from "./function/filterEntries.js";
import { initViewSwitcher } from "./function/viewSwitcher.js";
import { updateCalendarTotalAmount } from "./function/calendarTotalAmount.js";
import createHeader from "../components/header.js";
import createInputForm from "../components/inputForm/input-form.js";

function render() {
  const headerContainer = document.getElementById("header-container");
  headerContainer.innerHtml = "";
  const header = createHeader();
  headerContainer.appendChild(header);

  const inputForm = createInputForm();

  const inputFormContainer = document.getElementById("input-form-container");
  inputFormContainer.innerHTML = "";
  inputFormContainer.appendChild(inputForm);
}
// document.addEventListener("DOMContentLoaded", () => {
render();
// });
initCalendar();

initRenderDummyData();
initListener();
deleteEntries();
initFilterButtons();

initViewSwitcher();

updateCalendarTotalAmount();
