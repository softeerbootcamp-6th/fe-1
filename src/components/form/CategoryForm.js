export const CategoryForm = () => {
  const categoryForm = document.createElement("div");
  categoryForm.classList.add("form-category");
  categoryForm.innerHTML = `
        <label for="category" class="light-12">카테고리</label>
        <input type="text" id="category" name="category" placeholder="입력하세요">
    `;
  return categoryForm;
};
