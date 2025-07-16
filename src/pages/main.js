import { initTransactionForm } from "../components/TransactionForm.js";
import { initTransactionList } from "../components/TransactionList.js";

export function createMainLayout() {
  const main = document.getElementById("main");
  main.innerHTML = `
    <div id="transaction-form"></div>
    <div id="transaction-list"></div>
  `;
  initTransactionForm();
  initTransactionList();
}
