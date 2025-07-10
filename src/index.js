import { renderTransactionForm } from "./TransactionForm.js";
import { renderHeader } from "./Header.js";
import { renderTransactionItems } from "./TransactionList.js";

export function createMainLayout() {
  renderHeader();
  renderTransactionForm();
  renderTransactionItems();
}

createMainLayout();
