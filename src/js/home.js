import monthState from "../stores/subjects/MonthState.js";
import transactionState from "../stores/subjects/TransactionState.js";
import { TransactionsView } from "../views/Transactions/TransactionsView.js";
import { TransactionsObserver } from "../stores/observers/TransactionsObserver.js";
import { MonthObserver } from "../stores/observers/MonthObserver.js";
import { InputFormView } from "../views/InputForm/inputFormView.js";
import { InputFormObserver } from "../stores/observers/InputFormObserver.js";
import { InputFormState } from "../stores/subjects/InputFormState.js";
import {
  handleInputInputForm,
  handleClickInputForm,
  handleSubmitInputForm,
  handleClickTransactions,
} from "./homeEventHandler.js";

const inputFormState = new InputFormState();

const renderInputForm = async () => {
  const inputFormView = new InputFormView();
  const inputFormObserver = new InputFormObserver(inputFormView);
  inputFormState.subscribe(inputFormObserver);
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
  const monthObserver = new MonthObserver();
  monthState.subscribe(monthObserver);

  // Observer들 초기화
  const transactionsView = new TransactionsView();
  const transactionsObserver = new TransactionsObserver(transactionsView);

  transactionState.subscribe(transactionsObserver);

  // 모든 데이터를 먼저 로드한 후 월별 데이터 표시
  await transactionState.loadMonthData(`${year}-${month}`);

  const $transactions = document.querySelector(".transactions");
  $transactions.addEventListener("click", (e) =>
    handleClickTransactions(e, inputFormState)
  );
};

const init = async () => {
  await renderTransactions();
  await renderInputForm();
};

init();
