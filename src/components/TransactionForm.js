import { addObservers, setState, state } from "../store.js";
import { addEventListener } from "../utils/addEvent.js";
import { categories } from "../constants/categories.js";
import { renderTransactionForm } from "./TransactionFormView.js";
import DateState from "../store/DateState.js";
import {
  CategorySelectObserver,
  DateInputObserver,
  DescriptionLengthObserver,
  SubmitButtonObserver,
  TransactionTypeButtonObserver,
} from "../observers/transactionFormObservers.js";
import FormState from "../store/FormState.js";
import itemsState from "../store/ItemsState.js";

export function initTransactionForm() {
  renderTransactionForm();

  new DateInputObserver(DateState);
  new TransactionTypeButtonObserver(FormState);
  new DescriptionLengthObserver(FormState);
  new CategorySelectObserver(FormState);
  new SubmitButtonObserver(FormState);

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
    FormState.setFormState({ type: newType });
  });

  // submit 이벤트 위임 등록
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formState = FormState.getFormState();
    const newItem = {
      ...formState,
      id: Date.now(),
    };
    itemsState.setItems([...itemsState.getItems(), newItem]);
    console.log(itemsState.getItems());
    FormState.resetFormState();
    console.log(FormState.getFormState());
    renderTransactionForm();
  });
}
