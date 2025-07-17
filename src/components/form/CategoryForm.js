import { CATEGORY } from "../../constants/category.js";
import { EventDispatcher } from "../../utils/EventDispatcher.js";
import { ElementManager } from "../../utils/ElementManager.js";
import { DropDown } from "./DropDown.js";
import { formStore } from "../../store/FormStore.js";

export const CategoryForm = () => {
  let isCategoryOpen = false;
  const data = formStore.data;

  const categoryForm = ElementManager.renderElement("div", "form-category");
  categoryForm.innerHTML = `
    <label for="category" class="light-12">카테고리</label>
    <div class="form-input-wrapper">
      <input type="text" id="category" name="category" placeholder="선택하세요" value="${data.category}" readonly class="semibold-12" />
      <img width="16px" src="./src/assets/chevron-down.png" alt="arrow"/>
    </div>
  `;

  const categoryTextInput = categoryForm.querySelector("#category");
  const categoryImg = categoryForm.querySelector(".form-input-wrapper > img");

  formStore.subscribe((newData) => {
    categoryTextInput.value = newData.category;
  });

  EventDispatcher.register({
    eventType: "click",
    selector: "form-category",
    handler: ({ target }) => {
      const dropDownLi = target.closest(".drop-down-li");

      // 드롭다운 선택시
      if (dropDownLi) {
        const selectedCategory = dropDownLi.innerText;
        formStore.dispatch("update", { category: selectedCategory });
      }

      // 드롭다운 열기/닫기
      isCategoryOpen = !isCategoryOpen;
      categoryImg.src = `./src/assets/chevron-${
        isCategoryOpen ? "up" : "down"
      }.png`;

      if (isCategoryOpen) {
        const dropdown = DropDown({
          type: "category",
          data: CATEGORY[data.moneyType],
        });
        categoryForm.appendChild(dropdown);
      } else {
        const dropDown = categoryForm.querySelector(".drop-down");
        if (dropDown) categoryForm.removeChild(dropDown);
      }
    },
  });

  return categoryForm;
};
