import { EventDispatcher } from "../../utils/EventDispatcher.js";
import { ElementManager } from "../../utils/ElementManager.js";
import { formStore } from "../../store/FormStore.js";

export const DateForm = (input) => {
  const dateForm = ElementManager.renderElement("div", "form-date");
  dateForm.innerHTML = `
  <label for="date" class="light-12">일자</label>
  <input type="date" id="date" name="date" value="${input.date
    .toISOString()
    .slice(0, 10)}" class="semibold-12">
  `;

  formStore.subscribe((newData) => {
    const dateInput = dateForm.querySelector("#date");
    dateInput.value = new Date(newData.date).toISOString().slice(0, 10);
  });
  return dateForm;
};
