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
    entireForm.appendChild(FormChecker(formStore.data));
  };

  renderFormElement();
  formStore.subscribe(renderFormElement);

  EventDispatcher.register({
    eventType: "input",
    selector: "entire-form",
    handler: () => {
      console.log("inputßß");
      //! 현재 각 input의 입력을 실시간으로 인식하지 못하는 문제 -> 실시간 활성화되지 않는 문제 발생
      // money: money 내부에 input handelr 존재해서 중복되어 인식X
      // category, payment: span에 반영해서 input 태그로 변경하여 value 제시 필요
      const isFullFilled = InputValidator.validateFullFilled(formStore.data);
      const formCheckerWrapper = entireForm.querySelector(
        ".form-checker > .img-wrapper"
      );

      if (isFullFilled) {
        formCheckerWrapper.classList.add("active");
      } else {
        formCheckerWrapper.classList.remove("active");
      }
    },
  });
  return entireForm;
};
