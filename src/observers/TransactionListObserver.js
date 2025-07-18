import { renderTransactionList } from "../components/transaction-list/TransactionListView.js";
import ItemsState from "../store/ItemsState.js";
import FilterState from "../store/FilterState.js";
import DateState from "../store/DateState.js";

class TransactionListObserver {
  constructor(ItemsState, FilterState) {
    this.ItemsState = ItemsState;
    this.FilterState = FilterState;
    ItemsState.subscribe(this);
    FilterState.subscribe(this);
  }

  update() {
    renderTransactionList();
  }
}

class MonthSyncObserver {
  constructor(DateState, FilterState) {
    this.DateState = DateState;
    this.FilterState = FilterState;
    DateState.subscribe(this);
  }

  update() {
    const date = this.DateState.getDate(); // YYYY-MM-DD
    const yearMonth = date.slice(0, 7); // YYYY-MM
    if (this.FilterState.getMonth() !== yearMonth) {
      this.FilterState.setMonth(yearMonth);
    }
  }
}

let transactionListObserverInstance = null;
let monthSyncObserverInstance = null;

export function addTransactionListObservers() {
  if (transactionListObserverInstance) {
    ItemsState.unsubscribe(transactionListObserverInstance);
    FilterState.unsubscribe(transactionListObserverInstance);
  }
  if (monthSyncObserverInstance) {
    DateState.unsubscribe(monthSyncObserverInstance);
  }
  transactionListObserverInstance = new TransactionListObserver(
    ItemsState,
    FilterState
  );
  monthSyncObserverInstance = new MonthSyncObserver(DateState, FilterState);
}

export function removeTransactionListObservers() {
  if (transactionListObserverInstance) {
    ItemsState.unsubscribe(transactionListObserverInstance);
    FilterState.unsubscribe(transactionListObserverInstance);
    transactionListObserverInstance = null;
  }
  if (monthSyncObserverInstance) {
    DateState.unsubscribe(monthSyncObserverInstance);
    monthSyncObserverInstance = null;
  }
}
