// models/TransactionHistory.js
import { Subject } from '../core/Subject.js';

export class TransactionHistory extends Subject {
  constructor() {
    super();
    this.transactions = [];
  }

  loadFromStorage() {
    this.transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    this.notify();
  }

  addTransaction(tx) {
    this.transactions.push(tx);
    this.save();
    this.notify();
  }

  updateTransaction(id, newData) {
    const index = this.transactions.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.transactions[index] = { ...this.transactions[index], ...newData };
      this.save();
      this.notify();
    }
  }

  deleteTransaction(id) {
    this.transactions = this.transactions.filter((t) => t.id !== id);
    this.save();
    this.notify();
  }

  save() {
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
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