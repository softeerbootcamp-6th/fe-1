import { initTransactionForm } from "../components/TransactionForm.js";
import { initTransactionList } from "../components/TransactionList.js";

export function createMainLayout() {
  const main = document.getElementById("main");
  main.innerHTML = `
    <form id="transaction-form"></form>
    <div id="transaction-list"></div>
  `;
  initTransactionForm();
  initTransactionList();
}
