import { DateForm } from "./DateForm.js";
import { MoneyForm } from "./MoneyForm.js";
import { ContentForm } from "./ContentForm.js";
import { PaymentForm } from "./PaymentForm.js";
import { CategoryForm } from "./CategoryForm.js";
import { FormChecker } from "./FormChecker.js";

export const EntireForm = () => {
  const entireForm = document.createElement("div");
  entireForm.classList.add("entire-form");
  const input = {
    date: new Date("2023-08-01"),
    moneyType: "expense",
    money: "",
    content: "",
    payment: "",
    category: "aa",
  };

  const formList = [
    DateForm,
    MoneyForm,
    ContentForm,
    PaymentForm,
    CategoryForm,
  ];
  formList.forEach((Form, idx) => {
    if (idx !== 0) {
      const split = document.createElement("div");
      split.classList.add("split");
      entireForm.appendChild(split);
    }
    entireForm.appendChild(Form(input));
  });
  entireForm.appendChild(FormChecker(input));

  entireForm.addEventListener("input", (e) => {
    const target = e.target;
    if (!target.name) return;
    if (target.name === "date") {
      input.date = new Date(target.value);
    } else {
      input[target.name] = target.value;
    }
  });

  return entireForm;
};
