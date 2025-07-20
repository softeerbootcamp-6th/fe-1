import { initTransactionForm } from "../components/transaction-form/TransactionFormController.js";
import { initTransactionList } from "../components/transaction-list/TransactionListController.js";

export function createMainLayout() {
  const main = document.getElementById("main");
  main.innerHTML = `
    <form id="transaction-form"></form>
    <div id="transaction-list"></div>
  `;
  initTransactionForm();
  initTransactionList();
}
