import { DateForm } from "./DateForm.js";
import { MoneyForm } from "./MoneyForm.js";
import { ContentForm } from "./ContentForm.js";
import { PaymentForm } from "./PaymentForm.js";
import { CategoryForm } from "./CategoryForm.js";
import { FormChecker } from "./FormChecker.js";
import { ElementManager } from "../../utils/ElementManager.js";
import { InputValidator } from "../../utils/InputValidator.js";
import { EventDispatcher } from "../../utils/EventDispatcher.js";
import { formStore } from "../../store/FormStore.js";

export const EntireForm = () => {
  const entireForm = ElementManager.renderElement("div", "entire-form");
  const renderFormElement = () => {
    entireForm.innerHTML = ``;
    const formList = [
      DateForm,
      MoneyForm,
      ContentForm,
      PaymentForm,
      CategoryForm,
    ];
    formList.forEach((Form) => {
      entireForm.appendChild(Form(formStore.data));
    });
    entireForm.appendChild(FormChecker());
  };

  renderFormElement();

  formStore.subscribe((newData) => {
    console.log(newData);
    const isFullFilled = InputValidator.validateFullFilled(newData);
    const formCheckerWrapper = entireForm.querySelector(
      ".form-checker > .img-wrapper"
    );
    if (isFullFilled) {
      formCheckerWrapper.classList.add("active");
    } else {
      formCheckerWrapper.classList.remove("active");
    }
  });

  EventDispatcher.register({
    eventType: "input",
    selector: "entire-form",
    handler: ({ target }) => {
      const targetName = target.name;
      const targetValue = target.value;
      formStore.dispatch("update", { [targetName]: targetValue });
    },
  });
  return entireForm;
};
