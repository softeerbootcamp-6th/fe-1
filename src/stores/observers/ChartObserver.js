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
      this.view.renderDetail({
        sortedByDate,
        selectedCategory,
      });
    }
  }
}

export default ChartObserver;
