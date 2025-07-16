import monthStore from "../../stores/MonthStore.js";
import Subject from "../../utils/observers/Subject.js";
import { getTransactionByMonth } from "../../apis/transaction.js";

class TransactionState extends Subject {
  constructor() {
    super();
    this.transactions = [];
    this.filterState = {
      filterIncome: true,
      filterExpense: true,
    };
  }

  async loadMonthData(month) {
    const monthTransactions = await getTransactionByMonth(month);
    this.transactions = monthTransactions;
    this.notify({
      transactions: monthTransactions,
      filterState: this.filterState,
    });
  }

  async addTransaction(transaction) {
    try {
      const newTransaction = await addTransaction(transaction);

      const { year, month } = monthStore.getMonthInfo();
      await this.loadMonthData(`${year}-${month}`);
    } catch (error) {
      console.error("Error adding transaction:", error);
      throw error;
    }
  }

  async updateTransaction(id, newData) {
    try {
      const updatedTransaction = await updateTransaction(id, newData);

      const { year, month } = monthStore.getMonthInfo();
      await this.loadMonthData(`${year}-${month}`);
    } catch (error) {
      console.error("Error updating transaction:", error);
      throw error;
    }
  }

  async deleteTransaction(id) {
    try {
      await deleteTransaction(id);

      const { year, month } = monthStore.getMonthInfo();
      await this.loadMonthData(`${year}-${month}`);

      return true;
    } catch (error) {
      console.error("Error deleting transaction:", error);
      throw error;
    }
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
