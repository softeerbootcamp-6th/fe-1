import { DateStore } from "./dateStore.js";
import { TransactionStore } from "./transactionStore.js";
import { render } from "../utils/routes.js";

export const dateStore = new DateStore();

export const transactionStore = new TransactionStore();

export async function initStore() {
  await initDateStore();
  await initTransactionStore();
}

export async function initDateStore() {
  dateStore.subscribe(() => {
    render();
  });
}

export async function initTransactionStore() {
  const res = await fetch("./data/transactionsData.json");
  const data = await res.json();
  transactionStore.setTransactions(data);

  transactionStore.subscribe(() => {
    render();
  });
}
