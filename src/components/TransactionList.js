import { state, setState, addObservers } from "../store.js";
import { groupItemsByDate } from "../utils/group.js";
import { calculateSummary } from "../utils/summary.js";
import { formatDate } from "../utils/date.js";
import { renderComponent } from "../utils/render.js";
import { addEventListener } from "../utils/addEvent.js";
import { renderTransactionList } from "./transactionListView.js";
import ItemsState from "../store/ItemsState.js";
import { TransactionListObserver } from "../observers/TransactionListObserver.js";

export function initTransactionList() {
  renderTransactionList();
  new TransactionListObserver(ItemsState);
  addEventListener({
    id: "transaction-list",
    event: "click",
    onEvent: (e) => {
      const target = e.target;
      const deleteBtn = target.closest(".delete-btn");
      if (!deleteBtn) return;

      const itemDiv = deleteBtn.closest(".item");
      const itemId = Number(itemDiv.dataset.id);
      const updatedItems = itemsState
        .getItems()
        .filter((item) => item.id !== itemId);

      itemsState.setItems(updatedItems); // → notify → update → render
    },
  });
}

/* 아이템 삭제 함수 */
function deleteItem(itemId) {
  const currItems = state.items;
  const updatedItems = currItems.filter((item) => item.id !== itemId);
  setState({ items: updatedItems });
}
