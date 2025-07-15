import { initTransactionForm } from "../components/TransactionForm.js";
import { initTransactionList } from "../components/TransactionList.js";

export function createMainLayout(main) {
  main.innerHTML = `
    <div id="transaction-form"></div>
    <div id="transaction-list"></div>
  `;
  initTransactionForm();
  initTransactionList();
}
