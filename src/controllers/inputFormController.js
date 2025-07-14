import { Select } from "../components/index.js";
import createInputForm from "../views/InputForm/input-form.js";

const inputData = {
  id: localStorage.getItem("currentId"),
  date: new Date().toISOString().split("T")[0],
  type: "expenses", // income, expenses
  amount: 0,
  description: "",
  method: "",
  category: "",
};

const validateInputForm = () => {
  const inputFormButton = document.querySelector(".input-form__button");
  const buttonImg = inputFormButton.querySelector("img");

  if (
    inputData.id &&
    inputData.date &&
    inputData.amount &&
    inputData.description &&
    inputData.method &&
    inputData.category
  ) {
    inputFormButton.disabled = false;
    buttonImg.src = "/src/assets/icons/add-button.svg";
    buttonImg.alt = "add-button--enabled";
  } else {
    inputFormButton.disabled = true;
    buttonImg.src = "/src/assets/icons/add-button-disabled.svg";
    buttonImg.alt = "add-button--disabled";
  }
};

const renderCategorySelect = async (inputFormElement) => {
  const categorySelectContainer = inputFormElement.querySelector(
    "#category-select-container"
  );
  categorySelectContainer.innerHTML = "";
  const categoryObject = JSON.parse(localStorage.getItem("category"));
  const categorySelect = await Select({
    label: "분류",
    options: categoryObject[inputData.type],
    onChange: (selectedOption) => {
      inputData.category = selectedOption;
      validateInputForm();
    },
  });
  categorySelectContainer.appendChild(categorySelect);
};

const bindInputFormEvents = async (inputFormElement) => {
  const dateInput = inputFormElement.querySelector(".input-form__date-input");
  const amountInput = inputFormElement.querySelector(
    ".input-form__amount-input"
  );
  const descriptionInput = inputFormElement.querySelector(
    ".input-form__description-input"
  );
  const descriptionCount = inputFormElement.querySelector(
    ".input-form__description-count"
  );

  dateInput.value = inputData.date;
  amountInput.value = inputData.amount;
  descriptionInput.value = inputData.description;

  dateInput.addEventListener("change", (e) => {
    inputData.date = e.target.value;
    validateInputForm();
  });

  amountInput.addEventListener("input", (e) => {
    const numericValue = e.target.value.replace(/[^\d,]/g, "");
    const amount = Number(numericValue.replace(/,/g, ""));

    if (!isNaN(amount)) {
      inputData.amount = amount;
      amountInput.value = amount.toLocaleString() || "";
    } else {
      // 잘못된 입력인 경우 이전 값 유지
      amountInput.value = inputData.amount.toLocaleString() || "";
    }
    validateInputForm();
  });

  descriptionInput.addEventListener("input", (e) => {
    inputData.description = e.target.value;
    descriptionCount.textContent = `${e.target.value.length}/32`;
    validateInputForm();
  });

  const inputAmountIcon = inputFormElement.querySelector(
    ".input-form__amount-icon"
  );
  inputAmountIcon.addEventListener("click", () => {
    if (inputAmountIcon.classList.contains("input-form__amount-icon--minus")) {
      inputAmountIcon.classList.remove("input-form__amount-icon--minus");
      inputAmountIcon.classList.add("input-form__amount-icon--plus");
      inputData.type = "income";
    } else {
      inputAmountIcon.classList.remove("input-form__amount-icon--plus");
      inputAmountIcon.classList.add("input-form__amount-icon--minus");
      inputData.type = "expenses";
    }
    renderCategorySelect(inputFormElement);
    inputData.category = "";
    validateInputForm();
  });

  const methodSelectContainer = inputFormElement.querySelector(
    "#method-select-container"
  );
  methodSelectContainer.appendChild(
    await Select({
      label: "결제수단",
      options: JSON.parse(localStorage.getItem("method")),
      isEditable: true,
      onChange: (selectedOption) => {
        inputData.method = selectedOption;
        validateInputForm();
      },
    })
  );

  renderCategorySelect(inputFormElement);

  inputFormElement.addEventListener("submit", (e) => {
    e.preventDefault();

    const transactionsData = localStorage.getItem("transactionsData");
    const transactions = transactionsData ? JSON.parse(transactionsData) : {};

    const monthKey =
      inputData.date.split("-")[0] + "-" + inputData.date.split("-")[1];

    if (!transactions[monthKey]) {
      transactions[monthKey] = [];
    }
    transactions[monthKey].push(inputData);
    localStorage.setItem("transactionsData", JSON.stringify(transactions));
    localStorage.setItem("currentId", Number(inputData.id) + 1);
  });

  return inputFormElement;
};

export const initInputForm = async () => {
  const inputFormElement = await createInputForm();
  document.getElementById("input-form-container").appendChild(inputFormElement);
  bindInputFormEvents(inputFormElement);
};
