import { DateStore } from "./dateStore.js";
import { TransactionStore } from "./transactionStore.js";
import { PathStore } from "./pathStore.js";
import { render } from "../utils/routes.js";
import { updateNavigationActive } from "../components/header/tab.js";

export const dateStore = new DateStore();

export const transactionStore = new TransactionStore();

export const pathStore = new PathStore();

export async function initStore() {
  await initDateStore();
  await initTransactionStore();
  await initPathStore();
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

export async function initPathStore() {
  pathStore.subscribe(() => {
    render();
    updateNavigationActive();
  });
}
