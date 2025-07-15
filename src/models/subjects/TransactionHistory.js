// models/TransactionHistory.js
import Subject from "../../utils/observers/Subject.js";

class TransactionHistory extends Subject {
  constructor() {
    super();
    this.transactions = [];
  }

  initialize(month) {
    const transactionsData = JSON.parse(
      localStorage.getItem("transactionsData") || {}
    );
    this.transactions = transactionsData[month] || [];
    this.notify(this.transactions);
  }

  addTransaction(tx) {
    this.transactions.push(tx);
    this.save();
    this.notify(this.transactions);
  }

  updateTransaction(id, newData) {
    const index = this.transactions.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.transactions[index] = { ...this.transactions[index], ...newData };
      this.save();
      this.notify(this.transactions);
    }
  }

  deleteTransaction(id) {
    this.transactions = this.transactions.filter((t) => t.id !== id);
    this.save();
    this.notify();
  }

  save() {
    localStorage.setItem("transactionsData", JSON.stringify(this.transactions));
  }

  getByMonth(month) {
    return this.transactions.filter((t) => t.date.startsWith(month));
  }

  getFiltered(type) {
    return this.transactions.filter((t) => t.type === type);
  }

  getAll() {
    return this.transactions;
  }
}

const transactionHistory = new TransactionHistory();
export default transactionHistory;
