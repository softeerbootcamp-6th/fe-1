import { loadPage } from "./router.js";
import { store } from "./store.js";
import { loadHeaderHTML, initializeHeader } from "./header.js";
import {
  initToggleButton,
  getInputValues,
  initPaymentDropdown,
  initCategoryDropdown,
  initInputChanges,
  initModifyEvent,
} from "./input.js";
import {
  renderRecords,
  renderRecordByDate,
  getFormattedDate,
  initVisibleButton,
  renderRecordHeader,
  initDeleteEvent,
} from "./records.js";
import { subscribeStore } from "./subscribe.js";
window.addEventListener("DOMContentLoaded", async () => {
  // 오늘 날짜 기준 연도와 월 추출
  const today = new Date();
  const year = String(today.getFullYear());
  const month = String(today.getMonth() + 1);

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

  await store.init();
  subscribeStore();
  renderRecordHeader(year, month, store.getRecords());
  renderRecords(year, month, store.getRecords());
  initModifyEvent();
  initDeleteEvent();
});
window.addEventListener("hashchange", loadPage);
