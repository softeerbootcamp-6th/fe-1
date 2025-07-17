import FormState from "../../store/FormState.js";
import ItemsState from "../../store/ItemsState.js";
import { addEventListener } from "../../utils/addEvent.js";
import FilterState from "../../store/FilterState.js";
import { deleteItem, getItems } from "../../apis/items.js";

export function addTransactionListEvents() {
  addEventListener({
    id: "transaction-list",
    event: "click",
    onEvent: (e) => {
      if (e.target.matches(".filter-checkbox input")) {
        const label = e.target.closest(".filter-checkbox");
        if (label) {
          const type = label.textContent.includes("수입")
            ? "income"
            : "expense";
          FilterState.setFilter({ [type]: e.target.checked });
        }
        return;
      }

      const itemDiv = e.target.closest(".item");
      if (!itemDiv) return;

      // 삭제 버튼 클릭한 경우
      const deleteBtn = e.target.closest(".delete-btn");
      if (deleteBtn) {
        const itemId = itemDiv.dataset.id;
        deleteItem(itemId)
          .then(() => {
            const updatedItems = ItemsState.getItems().filter(
              (item) => item.id !== itemId
            );
            ItemsState.setItems(updatedItems);
          })
          .catch((error) => {
            throw error;
          });
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
