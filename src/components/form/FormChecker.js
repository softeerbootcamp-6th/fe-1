import { EventDispatcher } from "../../utils/EventDispatcher.js";
import { ElementManager } from "../../utils/ElementManager.js";
import { InputValidator } from "../../utils/InputValidator.js";
import { listStore } from "../../store/ListStore.js";

export const FormChecker = (input) => {
  const formChecker = ElementManager.renderElement("div", "form-checker");
  formChecker.innerHTML = `
    <div class="img-wrapper">
      <img src="./src/assets/check.svg" alt="check icon">
    </div>
    `;

  EventDispatcher.register({
    eventType: "click",
    selector: "form-checker",
    handler: () => {
      const isFullFilled = InputValidator.validateFullFilled(input);
      if (!isFullFilled) return;

      const isFullCorrectType = InputValidator.validateFullCorrectType(input);
      if (isFullCorrectType) {
        listStore.dispatch("addListItem", input);
      } else {
        console.log("no");
      }
    },
  });
  return formChecker;
};
