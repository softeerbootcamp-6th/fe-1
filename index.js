// js/index.js
import { initDate } from "./src/components/header/dateRender.js";
import { initRenderDummyData } from "./src/pages/main/ledger/renderDummyData.js";
import { initInputFormListener } from "./src/components/inputForm/inputFormItems/totalListener.js";
import { deleteEntry } from "./src/components/entries/entry.js";
import { initFilterButtons } from "./src/components/entries/filterEntries.js";
import { initViewSwitcher } from "./src/pages/main/viewSwitcher.js";
import { updateCalendarTotalAmount } from "./src/pages/main/calendar/calendarTotalAmount.js";
import createHeader from "./src/components/header/header.js";
import createInputForm from "./src/components/inputForm/input-form.js";
import { createTotalAmountContainer } from "./src/components/totalAmount/totalAmount.js";

/*
 render()
 화면에 헤더와 입력 폼, 수입지출액을 렌더링하는 함수
 */

function render() {
  const headerContainer = document.getElementById("header-container");
  headerContainer.innerHtml = "";
  const header = createHeader();
  headerContainer.appendChild(header);

  const inputForm = createInputForm();

  const inputFormContainer = document.getElementById("input-form-container");
  inputFormContainer.innerHTML = "";
  inputFormContainer.appendChild(inputForm);

  const totalAmount = createTotalAmountContainer();
  const totalAmountContainer = document.getElementById(
    "total-amount-container"
  );
  totalAmountContainer.innerHTML = "";
  totalAmountContainer.appendChild(totalAmount);
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
