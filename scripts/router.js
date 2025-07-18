import { recordStore } from "../store/recordStore.js";
import { dateStore } from "../store/dateStore.js";
import {
  initToggleButton,
  initPaymentDropdown,
  initCategoryDropdown,
  initInputChanges,
} from "./form/formUtils.js";
import { renderRecords, renderRecordHeader } from "./records/recordRender.js";
import {
  handleRecordUpdate,
  initFormSubmitEvent,
  initModifyEvent,
  initDeleteEvent,
} from "./records/recordUtils.js";
import { subscribeStore } from "../store/subscribe.js";
import { initCalanderHeader } from "./calander/calanderUtils.js";

const routes = {
  "#main": "../pages/main.html",
  "#calander": "../pages/calander.html",
  "#stats": "../pages/stats.html",
};

export const loadPage = async () => {
  const hash = window.location.hash || "#main";
  const path = routes[hash] || routes["#main"];
  try {
    const res = await fetch(path);
    const html = await res.text();
    document.getElementById("view").innerHTML = html;
  } catch (error) {
    console.error("Error loading page:", error);
    document.getElementById("view").innerHTML = "<h1>Page not found</h1>";
  }
};

export const initPage = {
  "#main": async () => {
    const { year, month } = dateStore.getDate();
    initToggleButton();
    initCategoryDropdown();
    initPaymentDropdown();
    initInputChanges();
    initFormSubmitEvent();

    await recordStore.init();
    subscribeStore();
    renderRecordHeader(year, month, recordStore.getRecords());
    renderRecords(year, month, recordStore.getRecords());
    initModifyEvent();
    initDeleteEvent();
  },
  "#calander": async () => {
    initCalanderHeader();
  },
};
