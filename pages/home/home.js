import { Header, CheckBox } from "../../components/index.js";

const renderHeader = () => {
  const header = Header({
    selectedNav: "home",
  });
  document.getElementById("header-container").appendChild(header);
};

const renderFilter = () => {
  const filterContainer = document.getElementById("filter-container");
  const incomeCheckBox = CheckBox({
    id: "income-checkbox",
    label: "수입 2,113,123",
  });
  const expenseCheckBox = CheckBox({
    id: "expense-checkbox",
    label: "지출 2,113,123",
  });

  filterContainer.append(incomeCheckBox, expenseCheckBox);
};

renderHeader();
renderFilter();
