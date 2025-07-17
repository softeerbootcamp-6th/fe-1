import { addTransactionListObservers } from "../../observers/TransactionListObserver.js";
import ItemsState from "../../store/ItemsState.js";
import { addTransactionListEvents } from "./TransactionListEvents.js";
import { renderTransactionList } from "./TransactionListView.js";

export async function initTransactionList() {
  await ItemsState.initItems();

  renderTransactionList();
  addTransactionListObservers();
  addTransactionListEvents();
}
