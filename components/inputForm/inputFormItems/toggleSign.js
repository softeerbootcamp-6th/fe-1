import { sharedState } from "../../../store/state.js";
import { store } from "../../../store/store.js";
import { renderCategoryOptions } from "./categoryRender.js";

export function initToggleSignListener() {
  const toggleSign = document.getElementById("toggle-sign");
  const categoryDisplay = document.getElementById("category-display");
  let isIncome = store.getState().isIncome; // sharedState에서 isIncome 가져오기
  let selectedCategory = store.getState().selectedCategory; // sharedState에서 selectedCategory 가져오기

  toggleSign.addEventListener("click", () => {
    isIncome = !isIncome;
    toggleSign.textContent = isIncome ? "+" : "-";
    toggleSign.classList.toggle("minus", !isIncome);
    categoryDisplay.textContent = "선택하세요";
    selectedCategory = null;
    store.setState({ isIncome, selectedCategory }); // store에 상태 업데이트
    renderCategoryOptions();
  });
}
