import { renderInputForm } from "./components/input/input-rendering.js";
import { renderSummary } from "./components/summary/summary-rendering.js";
import { renderHistoryList } from "./components/history/history-rendering.js";

export async function renderMain() {
  const mainHTML = `
        ${renderInputForm()}
        ${renderSummary()}
        ${renderHistoryList()}
    `;

  return mainHTML;
}

// 자동으로 메인 렌더링 및 초기화
document.addEventListener("DOMContentLoaded", function () {
  const bodyContainer = document.getElementById("body-container");
  if (bodyContainer) {
    bodyContainer.innerHTML = renderMain();
  }
});
