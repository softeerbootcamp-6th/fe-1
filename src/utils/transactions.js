export const groupByDate = (transactions) => {
  const result = transactions.reduce((acc, curr) => {
    const date = curr.date.split("-")[2];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {});

  return result;
};

export const sortByDate = (transactions) => {
  const result = Object.keys(transactions)
    .sort((a, b) => Number(b) - Number(a))
    .map((date) => ({
      date,
      transactions: transactions[date],
    }));

  return result;
};
