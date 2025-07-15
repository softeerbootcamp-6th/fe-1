import { EventDispatcher } from "../../store/EventBusStore.js";
import { ElementManager } from "../../utils/ElementManager.js";
import { InputValidator } from "../../utils/InputValidator.js";

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
      console.log(input);
      const isFullFilled = InputValidator.validateFullFilled(input);
      if (!isFullFilled) return;

      const isFullCorrectType = InputValidator.validateFullCorrectType(input);
      if (isFullCorrectType) {
        console.log("ok");
      } else {
        console.log("no");
      }
    },
  });
  return formChecker;
};
