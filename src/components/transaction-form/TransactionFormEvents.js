import { addItem, getItems, updateItem } from "../../apis/items.js";
import FormState from "../../store/FormState.js";
import ItemsState from "../../store/ItemsState.js";
import { addEvent } from "../../utils/addEvent.js";

export function addTransactionFormEvents() {
  addEvent({
    id: "transaction-form",
    event: "input",
    onEvent: (e) => {
      handleChangeInput(e);
    },
  });

  addEvent({
    id: "transaction-form",
    event: "click",
    onEvent: (e) => {
      handleClickToggleButton(e);
    },
  });

  addEvent({
    id: "transaction-form",
    event: "submit",
    onEvent: (e) => {
      handleSubmitButton(e);
    },
  });
}

// input 변경 이벤트 함수
function handleChangeInput(e) {
  const { name, value } = e.target;
  if (!name) return;

  FormState.setFormState({ [name]: value });
}

function handleClickToggleButton(e) {
  const toggleBtn = e.target.closest("#transaction-form-toggle-btn");
  if (!toggleBtn) return;

  const currentType = FormState.getFormState().type;
  const newType = currentType === "withdraw" ? "deposit" : "withdraw";
  FormState.setFormState({ type: newType, category: "" });
}

// toggle 버튼 변경 이벤트 함수

// form 제출 api 연결
function handleSubmitButton(e) {
  e.preventDefault();
  const formState = FormState.getFormState();
  const nowItem = {
    ...formState,
    id: formState.editId ?? Date.now(),
  };
  const isAdd = !Boolean(formState.editId);
  if (isAdd) submitPost(nowItem);
  else submitPut(formState.editId, nowItem);
}

// 추가 함수
function submitPost(nowItem) {
  addItem(nowItem)
    .then((newItem) => {
      const prevItems = ItemsState.getItems();
      const updatedItems = [...prevItems, newItem];
      ItemsState.setItems(updatedItems);
      FormState.resetFormState();
    })
    .catch((error) => {
      throw error;
    });
}

// 수정 함수
function submitPut(editId, nowItem) {
  updateItem({ id: editId, updatedItem: nowItem })
    .then((newItem) => {
      const prevItems = ItemsState.getItems();
      const updatedItems = prevItems.map((item) =>
        item.id === editId ? newItem : item
      );
      ItemsState.setItems(updatedItems);
      FormState.resetFormState();
    })
    .catch((error) => {
      throw error;
    });
}
