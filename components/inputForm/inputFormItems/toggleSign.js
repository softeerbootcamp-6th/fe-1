import { store } from "../../../store/store.js";
import { renderCategoryOptions } from "./categoryRender.js";

/* 
    Inputform의 토글버튼 리스너를 등록한다
    등록하는 동시에 카테고리 옵션이 변해야하므로 수입 지출 표시도 변경해 준다.
    이거 지금 textContent로 변경하는데,
    나중에 아이콘으로 변경해야 한다s.
*/
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
