import { Subject } from "./observer.js";

export class TransactionStore extends Subject {
  constructor() {
    super();
    this.transactions = {};
  }

  getTransactions() {
    return this.transactions;
  }

  setTransactions(transactions) {
    this.transactions = transactions;
    this.notify(this.transactions);
  }

  getTransactionsByYearMonth(year, month) {
    return this.transactions[year]?.[month] || [];
  }

  getTransactionById(year, month, id) {
    return this.transactions[year]?.[month]?.find((t) => t.id === id);
  }

  getGroupedTransactionsByDate(year, month) {
    const groupTransactionsByDate = (transactions) => {
      return transactions.reduce((grouped, transaction) => {
        const date = transaction.date;
        if (!grouped[date]) {
          grouped[date] = [];
        }
        grouped[date].push(transaction);
        return grouped;
      }, {});
    };
    return groupTransactionsByDate(this.transactions[year]?.[month] || []);
  }

  getTransactionsByCategory(year, month, category) {
    return this.transactions[year]?.[month]?.filter(
      (t) => t.category === category
    );
  }

  addTransaction(year, month, transaction) {
    if (!this.transactions[year]) {
      this.transactions[year] = {};
    }
    if (!this.transactions[year][month]) {
      this.transactions[year][month] = [];
    }
    this.transactions[year][month].push({
      ...transaction,
      id: Date.now(),
    });
    this.transactions[year][month].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    this.notify(this.transactions);
  }

  updateTransaction(year, month, id, transaction) {
    if (!this.transactions[year]?.[month]) {
      return;
    }
    const index = this.transactions[year][month].findIndex((t) => t.id === id);
    if (index !== -1) {
      this.transactions[year][month][index] = transaction;
    }
    this.transactions[year][month].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    this.notify(this.transactions);
  }

  deleteTransaction(year, month, id) {
    if (!this.transactions[year]?.[month]) {
      return;
    }
    this.transactions[year][month] = this.transactions[year][month].filter(
      (t) => t.id !== id
    );
    this.notify(this.transactions);
  }
}
