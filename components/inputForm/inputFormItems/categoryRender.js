import { store } from "../../../store/store.js";
import { updateTotalAmounts } from "../../totalAmount/totalAmount-util.js";

export function renderCategoryOptions() {
  let isIncome = store.getState().isIncome; // sharedState에서 isIncome 가져오기
  const categoryPanel = document.getElementById("category-panel");
  const incomeCategories = ["월급", "용돈", "기타수입"];
  const expenseCategories = [
    "생활",
    "식비",
    "교통",
    "쇼핑/뷰티",
    "의료/건강",
    "문화/여가",
    "미분류",
  ];

  updateTotalAmounts();
  categoryPanel.innerHTML = "";
  const list = isIncome ? incomeCategories : expenseCategories;

  list.forEach((item) => {
    const div = document.createElement("div");
    div.className = "dropdown-option";
    div.textContent = item;
    div.dataset.value = item;
    categoryPanel.appendChild(div);
  });
}
