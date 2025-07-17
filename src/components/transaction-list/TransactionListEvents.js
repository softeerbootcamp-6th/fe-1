import FormState from "../../store/FormState.js";
import ItemsState from "../../store/ItemsState.js";
import { addEvent } from "../../utils/addEvent.js";
import FilterState from "../../store/FilterState.js";
import { deleteItem, getItems } from "../../apis/items.js";

export function addTransactionListEvents() {
  addEvent({
    id: "transaction-list",
    event: "click",
    onEvent: (e) => {
      handleFilterList(e);
      handleDeleteItem(e);
      handleUpdateItem(e);
    },
  });
}

// 필터 함수
function handleFilterList(e) {
  if (e.target.matches(".filter-checkbox input")) {
    const label = e.target.closest(".filter-checkbox");
    if (label) {
      const type = label.textContent.includes("수입") ? "deposit" : "withdraw";
      FilterState.setFilter({ [type]: e.target.checked });
    }
    return;
  }
}

// 삭제 함수 (api)
function handleDeleteItem(e) {
  const itemDiv = e.target.closest(".item");
  if (!itemDiv) return;
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
}

function handleUpdateItem(e) {
  const itemDiv = e.target.closest(".item");
  if (!itemDiv) return;
  const itemId = itemDiv.dataset.id;
  const selectedItem = ItemsState.getItems().find((item) => item.id === itemId);
  if (!selectedItem) return;

  FormState.setFormState({
    ...selectedItem,
    editId: itemId,
  });
}
