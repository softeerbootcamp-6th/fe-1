import { renderTransactionForm } from "./TransactionForm.js";
import { renderHeader } from "./Header.js";
import { renderTransactionList } from "./components/TransactionList.js";

export function createMainLayout() {
  renderHeader();
  renderTransactionForm();
  renderTransactionList();
}

createMainLayout();
