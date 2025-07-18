import { Observer, groupByDate, sortByDate } from "../../utils/index.js";
import { transactionState } from "../subjects/index.js";

class ChartObserver extends Observer {
  constructor(view) {
    super();
    this.view = view;
  }

  update({ subject, data }) {
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
      const { selectedCategory } = data;
      const transactions = transactionState.getAll();
      const filteredByCategory = transactions.filter(
        (transaction) => transaction.category === selectedCategory
      );

      const groupedByDate = groupByDate(filteredByCategory);

      const sortedByDate = sortByDate(groupedByDate);
      const lineChartData = [
        { month: "2024-10", amount: 430000 },
        { month: "2024-11", amount: 390000 },
        { month: "2024-12", amount: 470000 },
        { month: "2025-01", amount: 520000 },
        { month: "2025-02", amount: 410000 },
        { month: "2025-03", amount: 450000 },
      ];
      this.view.renderDetail({
        selectedCategory,
        lineChartData,
        sortedByDate,
      });
    }
  }
}

export default ChartObserver;
