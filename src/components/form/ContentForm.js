export const ContentForm = (input) => {
  const maxLength = 32;
  const contentForm = document.createElement("div");
  contentForm.classList.add("form-content");
  contentForm.innerHTML = `
      <div class="light-12">${input.content.length}/${maxLength}</div>
      <label for="content" class="light-12">내용</label>
      <input type="text" id="content" name="content" placeholder="입력하세요" maxlength="32" value="${input.content}">
    `;

  const contentInput = contentForm.querySelector("input");
  const contentInputLength = contentForm.querySelector("div");
  contentInput.addEventListener("input", (e) => {
    input.content = e.target.value;
    contentInputLength.textContent = input.content.length + "/" + maxLength;
  });
  return contentForm;
};
