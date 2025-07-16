import { EventDispatcher } from "../../utils/EventDispatcher.js";
import { ElementManager } from "../../utils/ElementManager.js";

export const DateForm = (input) => {
  const dateForm = ElementManager.renderElement("div", "form-date");
  dateForm.innerHTML = `
  <label for="date" class="light-12">일자</label>
  <input type="date" id="date" name="date" value="${
    input.date.toISOString().split("T")[0]
  }" class="semibold-12">
  `;

  EventDispatcher.register({
    eventType: "input",
    selector: "form-date",
    handler: (e) => {
      input.date = new Date(e.target.value);
    },
  });
  return dateForm;
};
