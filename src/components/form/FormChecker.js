import { ElementManager } from "../../utils/ElementManager.js";
import { InputValidator } from "../../utils/InputValidator.js";

export const FormChecker = (input) => {
  const formChecker = ElementManager.renderElement("div", "form-checker");
  formChecker.innerHTML = `
      <img src="./src/assets/check.svg" alt="check icon">
    `;

  formChecker.addEventListener("click", () => {
    const isFullFilled = InputValidator.validateFullFilled(input);
    const isFullCorrectType = InputValidator.validateFullCorrectType(input);
    if (isFullFilled && isFullCorrectType) {
      console.log("ok");
    } else {
      console.log("no");
    }
  });
  return formChecker;
};
