import { ElementManager } from "../../utils/ElementManager.js";

export const FormChecker = (input) => {
  const formChecker = ElementManager.renderElement("div", "form-checker");
  formChecker.innerHTML = `
      <img style="width:40px" src="./src/assets/check.png" alt="check icon">
    `;

  formChecker.addEventListener("click", () => {
    console.log("입력값:", input);
  });
  return formChecker;
};
