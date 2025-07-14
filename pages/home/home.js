import {
  Header,
  CheckBox,
  CategoryTag,
  DailyHistory,
  Select,
} from "../../components/index.js";
import { getCurrentMonth } from "../../utils/month.js";

const inputData = {
  date: new Date().toISOString().split("T")[0],
  type: "expenses", // income, expenses
  amount: 0,
  description: "",
  method: "",
  category: "",
};

console.log(inputData);

const renderHeader = () => {
  const header = Header({
    selectedNav: "home",
    onChangeMonth: renderHistory,
  });
  document.getElementById("header-container").appendChild(header);
};

const renderInputForm = async () => {
  const dateInput = document.querySelector(".input-form__date-input");
  const amountInput = document.querySelector(".input-form__amount-input");
  const descriptionInput = document.querySelector(
    ".input-form__description-input"
  );
  const descriptionCount = document.querySelector(
    ".input-form__description-count"
  );

  dateInput.value = inputData.date;
  amountInput.value = inputData.amount;
  descriptionInput.value = inputData.description;

  dateInput.addEventListener("change", (e) => {
    inputData.date = e.target.value;
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
  });

  descriptionInput.addEventListener("input", (e) => {
    inputData.description = e.target.value;
    descriptionCount.textContent = `${e.target.value.length}/32`;
  });

  const inputAmountIcon = document.querySelector(".input-form__amount-icon");
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
  });

  const methodSelectContainer = document.getElementById(
    "method-select-container"
  );
  const methodSelect = await Select({
    label: "결제수단",
    options: JSON.parse(localStorage.getItem("method")),
    id: "method",
    isEditable: true,
    onSelect: (selectedOption) => {
      inputData.method = selectedOption;
    },
  });

  methodSelectContainer.appendChild(methodSelect);

  const categorySelectContainer = document.getElementById(
    "category-select-container"
  );
  const categoryObject = JSON.parse(localStorage.getItem("category"));
  const categorySelect = await Select({
    label: "분류",
    options: categoryObject[inputData.type],
    id: "category",
    onSelect: (selectedOption) => {
      inputData.category = selectedOption;
    },
  });

  categorySelectContainer.appendChild(categorySelect);
};

const renderFilter = () => {
  const filterContainer = document.getElementById("filter-container");
  const incomeCheckBox = CheckBox({
    id: "income-checkbox",
    checked: true,
    label: "수입 2,113,123",
    onChange: renderHistory,
  });
  const expenseCheckBox = CheckBox({
    id: "expense-checkbox",
    checked: true,
    label: "지출 2,113,123",
    onChange: renderHistory,
  });

  filterContainer.append(incomeCheckBox, expenseCheckBox);
};

const renderHistory = () => {
  const isIncomeChecked = document.getElementById("income-checkbox").checked;
  const isExpenseChecked = document.getElementById("expense-checkbox").checked;

  const { year, month } = getCurrentMonth();
  const transactionsData = JSON.parse(localStorage.getItem("transactionsData"));
  const currentMonthData = transactionsData[`${year}-${month}`] || [];

  const filteredData = currentMonthData.filter((item) => {
    if (isIncomeChecked && item.type === "income") {
      return true;
    }
    if (isExpenseChecked && item.type === "expenses") {
      return true;
    }
    return false;
  });
  const dailyGroupedData = filteredData.reduce((acc, curr) => {
    const date = curr.date.split("-")[2];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {});

  const sortedDailyGroupedData = Object.keys(dailyGroupedData)
    .sort((a, b) => Number(b) - Number(a))
    .map((date) => ({
      date,
      transactions: dailyGroupedData[date],
    }));

  const historyCount = document.querySelector(".history__header-count");
  historyCount.textContent = `${sortedDailyGroupedData.length}건`;
  const historyList = document.querySelector(".history__list");
  historyList.innerHTML = "";
  sortedDailyGroupedData.map((item) => {
    const historyItem = DailyHistory({
      date: `${year}-${month}-${item.date}`,
      items: item.transactions,
    });
    historyList.appendChild(historyItem);
  });

  const totalIncome = currentMonthData.reduce((acc, curr) => {
    if (curr.type === "income") {
      return acc + curr.amount;
    }
    return acc;
  }, 0);
  const totalExpense = currentMonthData.reduce((acc, curr) => {
    if (curr.type === "expenses") {
      return acc + curr.amount;
    }
    return acc;
  }, 0);

  const incomeLabel = document.querySelector(".income-checkbox-label");
  incomeLabel.textContent = `수입 ${totalIncome.toLocaleString()}원`;
  const expenseLabel = document.querySelector(".expense-checkbox-label");
  expenseLabel.textContent = `지출 ${totalExpense.toLocaleString()}원`;
};

renderHeader();
renderInputForm();
renderFilter();
renderHistory();
