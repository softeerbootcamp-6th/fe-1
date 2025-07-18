import { Observer, groupByDate, sortByDate } from "../../utils/index.js";
import { transactionState, monthState } from "../subjects/index.js";
import { getRecent6MonthsCategoryExpense } from "../../apis/transaction.js";

class ChartObserver extends Observer {
  constructor(view) {
    super();
    this.view = view;
  }

  async update({ subject, data }) {
    if (subject === "transactions") {
      const { transactions } = data;
      const expenseTransactions = transactions.filter(
        (transaction) => transaction.type === "expense"
      );
      const groupedByCategory = expenseTransactions.reduce((acc, tx) => {
        const { category, amount } = tx;
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += amount;

        return acc;
      }, {});

      this.view.render({ groupedByCategory });
    } else if (subject === "chart") {
      const { year, month } = monthState.getMonthInfo();
      const { selectedCategory } = data;
      const transactions = transactionState.getAll();
      const filteredByCategory = transactions.filter(
        (transaction) => transaction.category === selectedCategory
      );

      const groupedByDate = groupByDate(filteredByCategory);

      const sortedByDate = sortByDate(groupedByDate);
      const lineChartData = await getRecent6MonthsCategoryExpense(
        `${year}-${month}`,
        selectedCategory
      );
      this.view.renderDetail({
        selectedCategory,
        lineChartData,
        sortedByDate,
      });
    }
  }
}

export default ChartObserver;
