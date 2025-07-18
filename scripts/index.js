import { loadPage } from "./router.js";
import { recordStore } from "../store/recordStore.js";
import { loadHeaderHTML, initializeHeader } from "./header.js";
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
  initFormSubmitEvent();

  await recordStore.init();
  subscribeStore();
  renderRecordHeader(year, month, recordStore.getRecords());
  renderRecords(year, month, recordStore.getRecords());
  initModifyEvent();
  initDeleteEvent();
});
window.addEventListener("hashchange", loadPage);
