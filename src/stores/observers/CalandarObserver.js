import Observer from "../../utils/observers/Observer.js";

export class CalandarObserver extends Observer {
  constructor(view) {
    super();
    this.view = view;
  }

  update({ transactions }) {
    const dailyTransactions = transactions.reduce((acc, transaction) => {
      const day = transaction.date;
      if (!acc[day]) {
        acc[day] = {
          income: 0,
          expense: 0,
        };
      }
      if (transaction.type === "income") {
        acc[day].income += transaction.amount;
      } else {
        acc[day].expense += transaction.amount;
      }
      return acc;
    }, {});
    const totalIncome = Object.values(dailyTransactions).reduce(
      (acc, transaction) => acc + transaction.income,
      0
    );
    const totalExpense = Object.values(dailyTransactions).reduce(
      (acc, transaction) => acc + transaction.expense,
      0
    );
    this.view.render({ dailyTransactions, totalIncome, totalExpense });
  }
}
