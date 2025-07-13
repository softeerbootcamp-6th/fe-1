import { ElementManager } from "../../utils/ElementManager.js";
import { InputValidator } from "../../utils/InputValidator.js";

export const FormChecker = (input) => {
  const formChecker = ElementManager.renderElement("div", "form-checker");
  formChecker.innerHTML = `
      <img src="./src/assets/check.svg" alt="check icon">
    `;

  formChecker.addEventListener("click", () => {
    const isFullFilled = InputValidator.validateFullFilled(input);
    if (!isFullFilled) return;

    const isFullCorrectType = InputValidator.validateFullCorrectType(input);
    if (isFullCorrectType) {
      console.log("ok");
    } else {
      console.log("no");
    }
    console.log(input);
  });
  return formChecker;
};
