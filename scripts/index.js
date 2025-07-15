import { loadPage } from "./router.js";
import { loadHeaderHTML, initializeHeader } from "./header.js";
import {
  initToggleButton,
  getInputValues,
  initPaymentDropdown,
  initCategoryDropdown,
  initInputChanges,
} from "./input.js";
import { records, renderRecords, renderRecordByDate, getFormattedDate } from "./records.js";

window.addEventListener("DOMContentLoaded", async () => {
  // 헤더 html 로딩 후 초기화
  await loadHeaderHTML();
  initializeHeader();

  // 해시 값 별 각 페이지 로딩 후 초기화
  await loadPage();
  initToggleButton();
  initCategoryDropdown();
  initPaymentDropdown();
  initInputChanges();
  getInputValues();

  renderRecords(records);
});

window.addEventListener("hashchange", loadPage);
