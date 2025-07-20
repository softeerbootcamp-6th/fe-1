import { store } from "../../../store/store.js";
import { updateTotalAmounts } from "../../totalAmount/totalAmount-util.js";

/* 
  카테고리에서 드롭다운 옵션을 렌더링하는 함수
  이 함수가 실행되면 드롭다운 패널을 다 지운 후 수입, 지출 중 선택된 토글에 따라 드롭다운 패널을 전부 렌더링 한다.
*/

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
