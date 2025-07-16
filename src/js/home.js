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
    const id = inputFormState.updateId;
    if (id) {
      transactionState.updateTransaction(id, inputFormState.getState());
    } else {
      transactionState.addTransaction(inputFormState.getState());
    }
    inputFormState.reset();
  });
};

const renderTransactions = async () => {
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
    const $contentRow = e.target.closest(".daily-list__content-row");
    if (!$contentRow) return;

    const itemId = $contentRow.dataset.id;
    const $checkboxContainer = e.target.closest(".checkbox-container");
    if ($checkboxContainer) {
      const type = $checkboxContainer.dataset.type;
      toggleFilter(type);
      return;
    }

    const $deleteButton = e.target.closest(".content-row__delete-button");
    if ($deleteButton) {
      await transactionState.deleteTransaction(itemId);
      return;
    }

    if ($contentRow) {
      const $dailyList = e.target.closest(".history__daily-list");
      const amountString = $contentRow.querySelector(
        ".content-row__amount"
      ).textContent;

      const transactionType = amountString[0] === "-" ? "expense" : "income";
      const transactionAmount = Math.abs(
        Number(amountString.slice(0, -1).replace(/,/g, ""))
      );

      const currentData = {
        date: $dailyList.dataset.date,
        type: transactionType,
        amount: transactionAmount,
        description: $contentRow.querySelector(".content-row__description")
          .textContent,
        method: $contentRow.querySelector(".content-row__method").textContent,
        category: $contentRow.querySelector(".category-tag").textContent,
      };

      inputFormState.setUpdateId(itemId);
      inputFormState.setAll(currentData);
      return;
    }
  });
};

const init = async () => {
  await renderTransactions();
  await renderInputForm();
};

init();
