import { renderTransactionList } from "../components/transactionListView.js";

export class TransactionListObserver {
  constructor(itemsState) {
    this.itemsState = itemsState;
    itemsState.subscribe(this);
  }

  update() {
    renderTransactionList();
  }
}
