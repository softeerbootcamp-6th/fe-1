// js/index.js
import { initDate } from "./components/header/dateRender.js";
import { initRenderDummyData } from "./components/main/ledger/entries/renderDummyData.js";
import { initInputFormListener } from "./components/inputForm/inputFormItems/totalListener.js";
import { deleteEntry } from "./components/main/ledger/entries/entry.js";
import { initFilterButtons } from "./components/main/ledger/entries/filterEntries.js";
import { initViewSwitcher } from "./components/main/viewSwitcher.js";
import { updateCalendarTotalAmount } from "./components/main/calendar/calendarTotalAmount.js";
import createHeader from "./components/header/header.js";
import createInputForm from "./components/inputForm/input-form.js";

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

function initHeader() {
  initDate();
}

function initBody() {
  initRenderDummyData();

  initInputFormListener();
  deleteEntry();
  initFilterButtons();

  updateCalendarTotalAmount();
  initViewSwitcher();
}

function init() {
  render();
  initHeader();
  initBody();
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});
