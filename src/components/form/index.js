import { DateForm } from "./DateForm.js";
import { MoneyForm } from "./MoneyForm.js";
import { ContentForm } from "./ContentForm.js";
import { PaymentForm } from "./PaymentForm.js";
import { CategoryForm } from "./CategoryForm.js";
import { FormChecker } from "./FormChecker.js";
import { ElementManager } from "../../utils/ElementManager.js";
import { InputValidator } from "../../utils/InputValidator.js";

export const EntireForm = () => {
  const entireForm = ElementManager.renderElement("div", "entire-form");
  const input = {
    date: new Date("2023-08-01"),
    moneyType: "expense",
    money: "",
    content: "",
    payment: "",
    category: "",
  };

  const formList = [
    DateForm,
    MoneyForm,
    ContentForm,
    PaymentForm,
    CategoryForm,
  ];
  formList.forEach((Form, idx) => {
    entireForm.appendChild(Form(input));
  });
  entireForm.appendChild(FormChecker(input));

  entireForm.addEventListener("input", () => {
    const isFullFilled = InputValidator.validateFullFilled(input);
    const formCheckerWrapper = entireForm.querySelector(
      ".form-checker > .img-wrapper"
    );
    if (isFullFilled) {
      formCheckerWrapper.classList.add("active");
    } else {
      formCheckerWrapper.classList.remove("active");
    }
  });

  return entireForm;
};
