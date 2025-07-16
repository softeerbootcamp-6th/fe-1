import { DateStore } from "./dateStore.js";
import { TransactionStore } from "./transactionStore.js";

export const dateStore = new DateStore();

export const transactionStore = new TransactionStore();

export async function initTransactionStore() {
  const res = await fetch("./data/transactionsData.json");
  const data = await res.json();
  transactionStore.setTransactions(data);
}
