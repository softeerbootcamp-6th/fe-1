// 입출금내역 총합 계산 함수
export function calculateSummary(items) {
  return items.reduce(
    (acc, item) => {
      const amount = Number(item.amount);
      if (item.type === "withdraw") acc.withdraw += amount;
      else acc.deposit += amount;
      return acc;
    },
    { withdraw: 0, deposit: 0 }
  );
}
