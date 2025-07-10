import { Header, CheckBox, CategoryTag } from "../../components/index.js";

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

const renderCategory = () => {
  const categoryContainer1 = document.getElementById("category-test-1");
  const categoryContainer2 = document.getElementById("category-test-2");
  const category1 = CategoryTag({
    label: "식비",
  });
  const category2 = CategoryTag({
    label: "월급",
  });
  categoryContainer1.appendChild(category1);
  categoryContainer2.appendChild(category2);
};

renderHeader();
renderFilter();
renderCategory();
