import { loadPage, initPage } from "./router.js";
import { loadHeaderHTML, initializeHeader } from "./header.js";

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
  initPage[window.location.hash]();
});

window.addEventListener("hashchange", async () => {
  await loadPage();
  initPage[window.location.hash]();
});
