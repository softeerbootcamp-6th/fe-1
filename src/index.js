import { renderTransactionForm } from "./components/TransactionForm.js";
import { renderHeader } from "./components/Header.js";
import { renderTransactionList } from "./components/TransactionList.js";

export function createMainLayout() {
  renderHeader();
  renderTransactionForm();
  renderTransactionList();
}

createMainLayout();
