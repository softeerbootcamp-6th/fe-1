export const ContentForm = (input) => {
  const contentForm = document.createElement("div");
  contentForm.classList.add("form-content");
  contentForm.innerHTML = `
      <div class="light-12">0/32</div>
      <label for="content" class="light-12">내용</label>
      <input type="text" id="content" name="content" placeholder="입력하세요" maxlength="32" value="${input.content}">
    `;
  return contentForm;
};
