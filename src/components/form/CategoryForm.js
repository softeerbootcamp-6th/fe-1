import { CATEGORY } from "../../constants/category.js";
import { EventDispatcher } from "../../store/EventBusStore.js";
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

  EventDispatcher.register({
    eventType: "click",
    selector: "form-category",
    handler: ({ target }) => {
      // 이미지 업데이트
      const categoryImg = categoryForm.querySelector("#category > img");
      isCategoryOpen = !isCategoryOpen;
      categoryImg.src = `./src/assets/chevron-${
        isCategoryOpen ? "up" : "down"
      }.png`;

      // 값 업데이트+화면에 표시
      const dropDownLi = target.closest(".drop-down-li");
      if (dropDownLi) {
        const selectedCategory = target.innerText;
        input.category = selectedCategory;
        const categoryTextInput =
          categoryForm.querySelector("#category > span");
        categoryTextInput.textContent = selectedCategory;
      }

      // 드롭다운 화면에 표시/제거
      if (isCategoryOpen) {
        categoryForm.appendChild(
          DropDown({ type: "category", data: CATEGORY[input.moneyType] })
        );
      } else {
        const dropDown = categoryForm.querySelector(".drop-down");
        categoryForm.removeChild(dropDown);
      }
    },
  });
  return categoryForm;
};
