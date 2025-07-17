import { addEventListener } from "../utils/addEvent.js";
import { renderTransactionList } from "./transactionListView.js";
import ItemsState from "../store/ItemsState.js";
import { TransactionListObserver } from "../observers/TransactionListObserver.js";
import FormState from "../store/FormState.js";

export function initTransactionList() {
  renderTransactionList();
  new TransactionListObserver(ItemsState);
  addEventListener({
    id: "transaction-list",
    event: "click",
    onEvent: (e) => {
      const itemDiv = e.target.closest(".item");
      if (!itemDiv) return;

      const deleteBtn = e.target.closest(".delete-btn");
      if (deleteBtn) {
        const itemId = Number(itemDiv.dataset.id);
        const updatedItems = ItemsState.getItems().filter(
          (item) => item.id !== itemId
        );
        ItemsState.setItems(updatedItems);
        return;
      }

      const itemId = Number(itemDiv.dataset.id);
      const selectedItem = ItemsState.getItems().find(
        (item) => item.id === itemId
      );
      if (!selectedItem) return;

      FormState.setFormState({
        ...selectedItem,
        editId: itemId,
      });
    },
  });
}
