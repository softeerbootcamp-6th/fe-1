import { sharedState } from "../../../js/state/state.js";
import { renderCategoryOptions } from "../../../js/function/categoryRender.js";

export function initToggleSignListener() {
  const toggleSign = document.getElementById("toggle-sign");
  const categoryDisplay = document.getElementById("category-display");
  let isIncome = sharedState.isIncome;
  let selectedCategory = sharedState.selectedCategory;

  toggleSign.addEventListener("click", () => {
    isIncome = !isIncome;
    sharedState.isIncome = isIncome; // sharedState에 isIncome 업데이트
    toggleSign.textContent = isIncome ? "+" : "-";
    toggleSign.classList.toggle("minus", !isIncome);
    categoryDisplay.textContent = "선택하세요";
    selectedCategory = null;
    sharedState.selectedCategory = selectedCategory; // sharedState에 selectedCategory 업데이트
    renderCategoryOptions();
  });
}
