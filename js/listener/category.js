import { sharedState } from "../state/state.js";

export function initCategoryListener() {
    let selectedCategory = sharedState.selectedCategory; // sharedState에서 selectedCategory 요소를 가져옴

    const categoryWrapper = document.getElementById("category-wrapper");
    const categoryDisplay = document.getElementById("category-display");
    const categoryPanel = document.getElementById("category-panel");

    document.addEventListener("click", (e) => {
        if (!categoryWrapper.contains(e.target)) {
            categoryPanel.classList.add("hidden");
        }
    });

    categoryDisplay.addEventListener("click", () => {
      categoryPanel.classList.toggle("hidden");
    });
  
    categoryPanel.addEventListener("click", (e) => {
      if (e.target.classList.contains("dropdown-option")) {
        selectedCategory = e.target.dataset.value;
        sharedState.selectedCategory = selectedCategory; // sharedState에 selectedCategory 업데이트
        categoryDisplay.textContent = selectedCategory;
        categoryPanel.classList.add("hidden");
      }
    });
}
  