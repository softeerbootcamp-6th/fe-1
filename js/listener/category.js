import { store } from "../state/store.js";

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
