import { Observer } from "../../utils/index.js";

class ChartObserver extends Observer {
  constructor(view) {
    super();
    this.view = view;
  }

  update({ transactions }) {
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
  }
}

export default ChartObserver;
