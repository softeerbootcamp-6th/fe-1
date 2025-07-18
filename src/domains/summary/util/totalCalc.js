const calcAccumulator = (acc, { sign, amount }) => {
  // 부호에 따라 inc 또는 exp에 금액을 더하고, total을 계산
  sign === '-' ? (acc.exp += amount) : (acc.inc += amount);
  // total은 inc에서 exp를 뺀 값
  acc.total = acc.inc - acc.exp;
  // count는 항목의 개수
  acc.count++;
  return acc;
};

// reduce를 통해 총합 계산
// reduce에서 { inc: 0, exp: 0, total: 0, count: 0 }을 초기값으로 사용
export const calcTotals = ({ list }) => {
  return list.reduce(calcAccumulator, { inc: 0, exp: 0, total: 0, count: 0 });
};
