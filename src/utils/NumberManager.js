export const NumberManager = {
  parseToCommaNumber: (input) => {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  parseToNormalNumber: (input) => {
    return input.replace(/,/g, "");
  },
  calculateTotalMoney: (data) => {
    const totalMoney = {
      income: 0,
      expense: 0,
    };
    Object.keys(totalMoney).map((moneyType) => {
      totalMoney[moneyType] = data
        .filter((item) => item.moneyType === moneyType)
        .reduce((acc, curr) => acc + curr.money, 0);
    });
    return totalMoney;
  },
};
