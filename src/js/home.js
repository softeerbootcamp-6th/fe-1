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

const renderTransactionsHeader = async () => {
  const { year, month } = monthStore.getMonthInfo();
  const monthObserver = new MonthObserver();
  monthStore.subscribe(monthObserver);

  // Observer들 초기화
  const transactionsView = new TransactionsView();
  const transactionsInfo = new TransactionsInfo(transactionsView);

  transactionState.subscribe(transactionsInfo);

  // 모든 데이터를 먼저 로드한 후 월별 데이터 표시
  await transactionState.loadMonthData(`${year}-${month}`);

  const $transactions = document.querySelector(".transactions");
  $transactions.addEventListener("click", (e) => {
    const checkboxContainer = e.target.closest(".checkbox-container");
    if (checkboxContainer) {
      const type = checkboxContainer.dataset.type;
      toggleFilter(type);
    }
  });
};

const init = async () => {
  await renderTransactionsHeader();
  initInputForm();
};

init();
