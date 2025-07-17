import { addTransactionListObservers } from "../../observers/TransactionListObserver.js";
import { addTransactionListEvents } from "./TransactionListEvents.js";
import { renderTransactionList } from "./TransactionListView.js";

export function initTransactionList() {
  // 렌더링
  renderTransactionList();
  // 옵저버
  addTransactionListObservers();
  // 이벤트 등록
  addTransactionListEvents();
}
