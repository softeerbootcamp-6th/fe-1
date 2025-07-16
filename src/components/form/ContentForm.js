import { ElementManager } from "../../utils/ElementManager.js";

export const ContentForm = (input) => {
  const maxLength = 32;
  const contentForm = ElementManager.renderElement("div", "form-content");
  contentForm.innerHTML = `
  <label for="content" class="light-12">내용</label>
  <input type="text" id="content" name="content" placeholder="입력하세요" maxlength="32" value="${input.content}">
  <div class="light-12">0/32</div>
  `;

  const contentInput = contentForm.querySelector("input");
  const contentInputLength = contentForm.querySelector("div");
  contentInput.addEventListener("input", (e) => {
    input.content = e.target.value;
    contentInputLength.textContent = input.content.length + "/" + maxLength;
    console.log("a");
  });
  return contentForm;
};
