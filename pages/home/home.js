import {
  Header,
  CheckBox,
  CategoryTag,
  DailyHistory,
} from "../../components/index.js";
import { getCurrentMonth } from "../../utils/month.js";

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

const renderHeader = () => {
  const header = Header({
    selectedNav: "home",
    onChangeMonth: renderHistory,
  });
  document.getElementById("header-container").appendChild(header);
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

renderHeader();
renderFilter();
renderHistory();
