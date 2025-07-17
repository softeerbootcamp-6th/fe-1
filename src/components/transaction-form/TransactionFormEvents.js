import FormState from "../../store/FormState.js";
import ItemsState from "../../store/ItemsState.js";

export function addTransactionFormEvents() {
  const form = document.getElementById("transaction-form");
  if (!form) return;

  form.addEventListener("input", (e) => {
    const { name, value } = e.target;

    if (!name) return;
    FormState.setFormState({ [name]: value });
  });

  form.addEventListener("click", (e) => {
    const toggleBtn = e.target.closest("#transaction-form-toggle-btn");
    if (!toggleBtn) return;

    const currentType = FormState.getFormState().type;
    const newType = currentType === "withdraw" ? "deposit" : "withdraw";
    FormState.setFormState({ type: newType, category: "" });
  });

  // submit 이벤트 위임 등록
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formState = FormState.getFormState();
    const newItem = {
      ...formState,
      id: formState.editId ?? Date.now(),
    };

    const prevItems = ItemsState.getItems();
    const updatedItems = formState.editId
      ? prevItems.map((item) => (item.id === formState.editId ? newItem : item))
      : [...prevItems, newItem];

    ItemsState.setItems(updatedItems);
    FormState.resetFormState();
  });
}
