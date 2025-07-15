import monthStore from "../stores/MonthStore.js";
import transactionState from "../models/subjects/TransactionState.js";
import { TransactionsView } from "../views/Transactions/TransactionsView.js";
import { TransactionsInfo } from "../models/observers/TransactionsInfo.js";
import { initInputForm } from "../controllers/InputFormController.js";
import { MonthObserver } from "../models/observers/MonthObserver.js";

const toggleFilter = (type) => {
  const filterState = transactionState.getFilterState();
  filterState[type] = !filterState[type];
  transactionState.setFilterState(filterState);
};

const renderTransactionsHeader = () => {
  const { year, month } = monthStore.getMonthInfo();
  const monthObserver = new MonthObserver();
  monthStore.subscribe(monthObserver);

  // Observer들 초기화
  const transactionsView = new TransactionsView();
  const transactionsInfo = new TransactionsInfo(transactionsView);

  transactionState.subscribe(transactionsInfo);
  transactionState.loadMonthData(`${year}-${month}`);

  const $transactions = document.querySelector(".transactions");
  $transactions.addEventListener("click", (e) => {
    const checkboxContainer = e.target.closest(".checkbox-container");
    if (checkboxContainer) {
      const type = checkboxContainer.dataset.type;
      toggleFilter(type);
    }
  });
};

const init = () => {
  renderTransactionsHeader();
  initInputForm();
};

init();
