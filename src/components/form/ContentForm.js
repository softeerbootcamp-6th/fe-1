import { formStore } from "../../store/FormStore.js";
import { ElementManager } from "../../utils/ElementManager.js";

export const ContentForm = (input) => {
  const maxLength = 32;
  const contentForm = ElementManager.renderElement("div", "form-content");
  contentForm.innerHTML = `
  <label for="content" class="light-12">내용</label>
  <input type="text" id="content" name="content" placeholder="입력하세요" maxlength="32" value="${input.content}">
  <div class="light-12"><span class="form-content-length">0</span>/${maxLength}</div>
  `;

  formStore.subscribe((newData) => {
    const contentInputLength = contentForm.querySelector(
      ".form-content-length"
    );
    contentInputLength.textContent = newData.content.length;
  });
  return contentForm;
};
