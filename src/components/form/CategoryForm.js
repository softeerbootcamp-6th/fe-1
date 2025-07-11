export const CategoryForm = (input) => {
  let isCategoryOpen = false;
  const categoryForm = document.createElement("div");
  categoryForm.classList.add("form-category");
  categoryForm.innerHTML = `
        <label for="category" class="light-12">카테고리</label>
        <button id="category">
          <span class="semibold-12">${input.category}</span>
          <img width="16px" src="./src/assets/chevron-${
            isCategoryOpen ? "up" : "down"
          }.png" alt="arrow"/>
        </button>
    `;

  const categoryImg = categoryForm.querySelector("#category > img");
  categoryForm.addEventListener("click", () => {
    isCategoryOpen = !isCategoryOpen;
    categoryImg.src = `./src/assets/chevron-${
      isCategoryOpen ? "up" : "down"
    }.png`;
  });
  return categoryForm;
};
