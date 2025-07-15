import Observer from "../../utils/observers/Observer.js";

export class TransactionsInfo extends Observer {
  constructor(view) {
    super();
    this.state = {
      transactionCount: 0,
      totalIncome: 0,
      totalExpense: 0,
    };
    this.view = view;
  }

  update(transactions) {
    this.state = {
      transactionCount: transactions.length,
      totalIncome: transactions.reduce((acc, curr) => {
        if (curr.type === "income") {
          return acc + curr.amount;
        }
        return acc;
      }, 0),
      totalExpense: transactions.reduce((acc, curr) => {
        if (curr.type === "expense") {
          return acc + curr.amount;
        }
        return acc;
      }, 0),
    };

    this.view.render(this.state);
  }
}
