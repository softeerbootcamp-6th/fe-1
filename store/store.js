export const store = {
  incomeExpenseData: {},

  // incomeExpenseData 불러 오기
  // promise 반환
  loadIncomeExpenseData() {
    const dataPromise = fetch('./data/incomeExpenseData.json')
      .then(response => response.json())
      .then(data => {
        this.incomeExpenseData = data;
      })
      .catch(error => {
        console.error('데이터 로딩 실패:', error);
        this.incomeExpenseData = {};
      });

    return dataPromise;
  },

  // incomeExpenseData 업데이트
  updateIncomeExpenseData(dateInputValue, newIncomeExpense) {
    // 해당 월에 데이터 있는지 확인
    const currentYear = dateInputValue.split('-')[0];
    const currentMonth = dateInputValue.split('-')[1];
    const currentKey = `${currentYear}-${currentMonth}`;
    let dataID = 0;

    const monthData = this.incomeExpenseData[currentKey];

    if (monthData) {
      // 해당 일 데이터 가져오기
      const dateData = monthData.find(data => data.date === dateInputValue);
      if (dateData) {
        // ID 생성 (해당 날짜 데이터의 max ID + 1)
        dataID =
          dateData.income_expense[dateData.income_expense.length - 1].id + 1;
        newIncomeExpense.id = dataID;

        // dateData에 새로운 지출/수입 추가
        dateData.income_expense.push(newIncomeExpense);

        // date 데이터 비어있을 때
      } else {
        monthData.push({
          date: dateInputValue,
          income_expense: [newIncomeExpense],
        });
      }
      // month 데이터 비어있을 때
    } else {
      this.incomeExpenseData[currentKey] = [
        { date: dateInputValue, income_expense: [newIncomeExpense] },
      ];
    }
  },
};
