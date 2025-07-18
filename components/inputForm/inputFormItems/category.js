import { store } from "../../../store/store.js";

/* 
  카테고리에서 드롭다운 패널을 보이거나 숨기는 이벤트리스너와 
  옵션 선택시 렌더링 되는 리스너
*/

export function initCategoryListener() {
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
      const selectedCategory = e.target.dataset.value;
      store.setState({ selectedCategory });
      categoryDisplay.textContent = selectedCategory;
      categoryPanel.classList.add("hidden");
    }
  });
}
