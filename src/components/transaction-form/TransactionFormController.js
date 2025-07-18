import { addTransactionFormObservers } from "../../observers/transactionFormObservers.js";
import { renderTransactionForm } from "./TransactionFormView.js";
import { addTransactionFormEvents } from "./TransactionFormEvents.js";

export function initTransactionForm() {
  renderTransactionForm();
  addTransactionFormObservers();

  addTransactionFormEvents();
}
