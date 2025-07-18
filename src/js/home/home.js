import {
  monthState,
  transactionState,
  inputFormState,
} from "../../stores/subjects/index.js";

import {
  TransactionsObserver,
  InputFormObserver,
} from "../../stores/observers/index.js";

import { TransactionsView, InputFormView } from "../../views/index.js";

import {
  handleInputInputForm,
  handleClickInputForm,
  handleSubmitInputForm,
  handleClickTransactions,
} from "./homeEventHandler.js";

import { subscribeHomeObserver } from "../../utils/index.js";

const renderInputForm = async () => {
  inputFormState.init();

  const inputFormElement = document.querySelector(".input-form");
  inputFormElement.addEventListener("input", (e) =>
    handleInputInputForm(e, inputFormState)
  );

  inputFormElement.addEventListener("click", (e) =>
    handleClickInputForm(e, inputFormState)
  );

  inputFormElement.addEventListener("submit", (e) =>
    handleSubmitInputForm(e, inputFormState)
  );
};

const renderTransactions = async () => {
  const { year, month } = monthState.getMonthInfo();

  // 모든 데이터를 먼저 로드한 후 월별 데이터 표시
  await transactionState.loadMonthData(`${year}-${month}`);

  const $transactions = document.querySelector(".transactions");
  $transactions.addEventListener("click", (e) =>
    handleClickTransactions(e, inputFormState)
  );
};

const init = async () => {
  subscribeHomeObserver();
  await renderTransactions();
  await renderInputForm();
};

init();
