// js/index.js
import { initDate } from "./components/header/dateRender.js";
import { initRenderDummyData } from "./pages/main/ledger/entries/renderDummyData.js";
import { initInputFormListener } from "./components/inputForm/inputFormItems/totalListener.js";
import { deleteEntry } from "./pages/main/ledger/entries/entry.js";
import { initFilterButtons } from "./pages/main/ledger/entries/filterEntries.js";
import { initViewSwitcher } from "./pages/main/viewSwitcher.js";
import { updateCalendarTotalAmount } from "./pages/main/calendar/calendarTotalAmount.js";
import createHeader from "./components/header/header.js";
import createInputForm from "./components/inputForm/input-form.js";
import { createTotalAmountContainer } from "./components/totalAmount/totalAmount.js";
// import { worker } from "./mocks/browser.js";
// import { worker } from "./mocks/handlers.js";
// await worker.start();

export const enableMocking = async () => {
  // if (process.env.NODE_ENV !== "development") {
  // return;
  // }

  const { worker } = await import("./mocks/browser.js");
  return worker.start({
    serviceWorker: {
      url: "/public/mockServiceWorker.js",
    },
  });
};

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
