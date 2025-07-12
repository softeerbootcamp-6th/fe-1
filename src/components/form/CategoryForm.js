import { CATEGORY } from "../../constants/category.js";
import { ElementManager } from "../../utils/ElementManager.js";
import { DropDown } from "./DropDown.js";

export const CategoryForm = (input) => {
  let isCategoryOpen = false;
  const categoryForm = ElementManager.renderElement("div", "form-category");
  categoryForm.innerHTML = `
  <label for="category" class="light-12">카테고리</label>
  <button id="category">
    <span class="semibold-12">분류하세요</span>
    <img width="16px" src="./src/assets/chevron-down.png" alt="arrow"/>
  </button>
  `;

  const categoryImg = categoryForm.querySelector("#category > img");
  categoryForm.addEventListener("click", (e) => {
    // 이미지 업데이트
    isCategoryOpen = !isCategoryOpen;
    categoryImg.src = `./src/assets/chevron-${
      isCategoryOpen ? "up" : "down"
    }.png`;

    // 드롭다운 화면에 표시/제거
    if (isCategoryOpen) {
      categoryForm.appendChild(DropDown("category", CATEGORY[input.moneyType]));
    } else {
      const dropDown = categoryForm.querySelector(".drop-down");
      categoryForm.removeChild(dropDown);
    }
  });
  return categoryForm;
};
