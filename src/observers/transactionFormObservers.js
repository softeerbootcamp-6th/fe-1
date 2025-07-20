import {
  renderCategorySelect,
  updateDescriptionCount,
} from "../components/transaction-form/TransactionFormView.js";
import DateState from "../store/DateState.js";
import FormState from "../store/FormState.js";

class DateInputObserver {
  constructor() {
    FormState.subscribe(this);
  }

  update() {
    const input = document.getElementById("date-input");
    if (input) {
      input.value = FormState.getFormState().date;
    }
  }
}

class TransactionTypeButtonObserver {
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

class DescriptionLengthObserver {
  constructor(formState) {
    this.formState = formState;
    formState.subscribe(this);
  }

  update() {
    const desc = this.formState.getFormState().description;
    updateDescriptionCount(desc.length);
  }
}

class InputObserver {
  constructor(formState) {
    this.formState = formState;
    formState.subscribe(this);
  }

  update() {
    const { amount, description, method, category, type } =
      this.formState.getFormState();

    const amountInput = document.getElementById("amount-input");
    if (amountInput) amountInput.value = amount;

    const typeInput = document.getElementById("type-input");
    if (typeInput) typeInput.value = type;

    const descInput = document.getElementById("desc-input");
    if (descInput) descInput.value = description;
  }
}

class CategorySelectObserver {
  constructor(formState) {
    this.formState = formState;
    formState.subscribe(this);
  }

  update() {
    const { type, category } = this.formState.getFormState();
    renderCategorySelect(type, category);
  }
}

class SubmitButtonObserver {
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

class MethodSelectObserver {
  constructor(formState) {
    this.formState = formState;
    formState.subscribe(this);
  }

  update() {
    const { method } = this.formState.getFormState();
    const methodSelect = document.getElementById("method-select");
    if (methodSelect) methodSelect.value = method;
  }
}

let transactionFormObserverInstances = [];

export function addTransactionFormObservers() {
  removeTransactionFormObservers();
  transactionFormObserverInstances = [
    new DateInputObserver(),
    new TransactionTypeButtonObserver(FormState),
    new InputObserver(FormState),
    new DescriptionLengthObserver(FormState),
    new CategorySelectObserver(FormState),
    new SubmitButtonObserver(FormState),
    new MethodSelectObserver(FormState),
  ];
}

export function removeTransactionFormObservers() {
  if (transactionFormObserverInstances.length > 0) {
    transactionFormObserverInstances.forEach((observer) => {
      if (observer.dateState) {
        observer.dateState.unsubscribe(observer);
      }
      if (observer.formState) {
        observer.formState.unsubscribe(observer);
      }
    });
    transactionFormObserverInstances = [];
  }
}
