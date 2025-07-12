import { renderTransactionForm } from "./components/TransactionForm.js";
import { renderHeader } from "./components/Header.js";
import {
  initEventListeners as initEventListnerAtTransactionList,
  renderTransactionList,
} from "./components/TransactionList.js";

function createMainLayout() {
  initEventListnerAtTransactionList();

  renderHeader();
  renderTransactionForm();
  renderTransactionList();
}

createMainLayout();
