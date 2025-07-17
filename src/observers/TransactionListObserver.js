import { renderTransactionList } from "../components/transaction-list/TransactionListView.js";
import ItemsState from "../store/ItemsState.js";

class TransactionListObserver {
  constructor(ItemsState) {
    this.ItemsState = ItemsState;
    ItemsState.subscribe(this);
  }

  update() {
    renderTransactionList();
  }
}

export function addTransactionListObservers() {
  new TransactionListObserver(ItemsState);
}
