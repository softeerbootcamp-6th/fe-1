import monthState from "../stores/subjects/MonthState.js";
import transactionState from "../stores/subjects/TransactionState.js";
import { TransactionsView } from "../views/Transactions/TransactionsView.js";
import { TransactionsObserver } from "../stores/observers/TransactionsObserver.js";
import { MonthObserver } from "../stores/observers/MonthObserver.js";
import { InputFormView } from "../views/InputForm/inputFormView.js";
import { InputFormObserver } from "../stores/observers/InputFormObserver.js";
import { InputFormState } from "../stores/subjects/InputFormState.js";

const inputFormState = new InputFormState();

const toggleFilter = (type) => {
  const filterState = transactionState.getFilterState();
  filterState[type] = !filterState[type];
  transactionState.setFilterState(filterState);
};

const renderTransactionsHeader = async () => {
  const { year, month } = monthState.getMonthInfo();
  const monthObserver = new MonthObserver();
  monthState.subscribe(monthObserver);

  // Observer들 초기화
  const transactionsView = new TransactionsView();
  const transactionsObserver = new TransactionsObserver(transactionsView);

  transactionState.subscribe(transactionsObserver);

  // 모든 데이터를 먼저 로드한 후 월별 데이터 표시
  await transactionState.loadMonthData(`${year}-${month}`);

  const $transactions = document.querySelector(".transactions");
  $transactions.addEventListener("click", async (e) => {
    const checkboxContainer = e.target.closest(".checkbox-container");
    if (checkboxContainer) {
      const type = checkboxContainer.dataset.type;
      toggleFilter(type);
      return;
    }

    const deleteButton = e.target.closest(".content-row__delete-button");
    if (deleteButton) {
      const id = deleteButton.dataset.id;
      await transactionState.deleteTransaction(id);
      return;
    }
  });
};

const renderInputForm = async () => {
  const inputFormView = new InputFormView();
  const inputFormObserver = new InputFormObserver(inputFormView);
  inputFormState.subscribe(inputFormObserver);
  inputFormState.init();

  const inputFormElement = document.querySelector(".input-form");
  inputFormElement.addEventListener("input", (e) => {
    let { name, value } = e.target;
    if (name === "amount") {
      const formattedValue = Number(value.replace(/,/g, ""));
      value = formattedValue;
    }
    inputFormState.setField(name, value);
  });

  inputFormElement.addEventListener("click", (e) => {
    const $amountIcon = e.target.closest(".input-form__amount-icon");
    if ($amountIcon) {
      inputFormState.toggleType();
    }

    // delete button 추가해야함

    const $selectItem = e.target.closest(".select-item");

    const $methodSelect = e.target.closest("#method-select-container");
    if ($methodSelect && $selectItem) {
      inputFormState.setField("method", $selectItem.dataset.value);
    }

    const $categorySelect = e.target.closest("#category-select-container");
    if ($categorySelect && $selectItem) {
      inputFormState.setField("category", $selectItem.dataset.value);
    }
  });

  inputFormElement.addEventListener("submit", (e) => {
    e.preventDefault();
    transactionState.addTransaction(inputFormState.getState());
    inputFormState.reset();
  });
};

const init = async () => {
  await renderTransactionsHeader();
  await renderInputForm();
};

init();
