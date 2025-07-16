import { initTransactionForm } from "../components/TransactionForm.js";
import {
  renderCategorySelect,
  renderTransactionForm,
  updateDescriptionCount,
} from "../components/TransactionFormView.js";
import DateState from "../store/DateState.js";
import FormState from "../store/FormState.js";

export class DateInputObserver {
  constructor(dateState) {
    this.dateState = dateState;
    dateState.subscribe(this);
  }

  update() {
    const input = document.getElementById("date-input");
    if (input) {
      input.value = this.dateState.getDate();
    }
  }
}

export class TransactionTypeButtonObserver {
  constructor(formState) {
    this.formState = formState;
    formState.subscribe(this);
  }

  update() {
    const type = this.formState.getFormState().type;
    const btn = document.getElementById("transaction-form-toggle-btn");
    if (!btn) return;

    btn.classList.remove(
      "transaction-type-icon-plus",
      "transaction-type-icon-minus"
    );

    const newClass =
      type === "deposit"
        ? "transaction-type-icon-plus"
        : "transaction-type-icon-minus";
    btn.classList.add(newClass);
  }
}

export class DescriptionLengthObserver {
  constructor(formState) {
    this.formState = formState;
    formState.subscribe(this);
  }

  update() {
    const desc = this.formState.getFormState().description;
    updateDescriptionCount(desc.length);
  }
}

export class CategorySelectObserver {
  constructor(formState) {
    this.formState = formState;
    formState.subscribe(this);
  }

  update() {
    const { type, category } = this.formState.getFormState();
    renderCategorySelect(type, category);
  }
}

export class SubmitButtonObserver {
  constructor(formState) {
    this.formState = formState;
    formState.subscribe(this);
  }

  update() {
    const { date, amount, type, description, method, category } =
      this.formState.getFormState();

    const isValid =
      !!date && !!amount && !!type && !!description && !!method && !!category;

    const btn = document.getElementById("submit-btn");
    if (btn) btn.disabled = !isValid;
  }
}

export class TransactionFormObserver {
  constructor(formState) {
    this.formState = formState;
    formState.subscribe(this);
  }

  update() {
    const { editId, date, amount, type, description, method, category } =
      this.formState.getFormState();
    if (!editId) return;

    const dateInput = document.getElementById("date-input");
    if (dateInput) dateInput.value = date;

    const amountInput = document.getElementById("amount-input");
    if (amountInput) amountInput.value = amount;

    const typeInput = document.getElementById("type-input");
    if (typeInput) typeInput.value = type;

    const descInput = document.getElementById("desc-input");
    if (descInput) descInput.value = description;

    const methodSelect = document.getElementById("method-select");
    if (methodSelect) methodSelect.value = method;

    renderCategorySelect(type, category);
  }
}
