import Subject from "../../utils/observers/Subject.js";

class TransactionState extends Subject {
  constructor() {
    super();
    this.transactions = [];
    this.filterState = {
      filterIncome: true,
      filterExpense: true,
    };
  }

  initialize(month) {
    const transactionsData = JSON.parse(
      localStorage.getItem("transactionsData") || {}
    );
    this.transactions = transactionsData[month] || [];
    this.notify({
      transactions: this.transactions,
      filterState: this.filterState,
    });
  }

  addTransaction(tx) {
    this.transactions.push(tx);
    this.save();
    this.notify({
      transactions: this.transactions,
      filterState: this.filterState,
    });
  }

  updateTransaction(id, newData) {
    const index = this.transactions.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.transactions[index] = { ...this.transactions[index], ...newData };
      this.save();
      this.notify({
        transactions: this.transactions,
        filterState: this.filterState,
      });
    }
  }

  deleteTransaction(id) {
    this.transactions = this.transactions.filter((t) => t.id !== id);
    this.save();
    this.notify({
      transactions: this.transactions,
      filterState: this.filterState,
    });
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

  getFilterState() {
    return this.filterState;
  }

  setFilterState(state) {
    this.filterState = state;
    this.notify({
      transactions: this.transactions,
      filterState: this.filterState,
    });
  }
}

const transactionState = new TransactionState();
export default transactionState;
