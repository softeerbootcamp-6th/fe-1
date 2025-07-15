import { initTransactionForm } from "./components/TransactionForm.js";
import { initHeader } from "./components/Header.js";
import { initTransactionList } from "./components/TransactionList.js";

function createMainLayout() {
  initHeader();
  initTransactionForm();
  initTransactionList();
}

createMainLayout();
