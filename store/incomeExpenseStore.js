class IncomeExpenseStore {
  constructor() {
    this.incomeExpenseData = {};
    this.listenrs = [];
  }

  // incomeExpenseData 불러 오기
  // promise 반환
  loadIncomeExpenseData() {
    const dataPromise = fetch("./data/incomeExpenseData.json")
      .then((response) => response.json())
      .then((data) => {
        this.incomeExpenseData = data;
      })
      .catch((error) => {
        console.error("데이터 로딩 실패:", error);
        this.incomeExpenseData = {};
      });

    return dataPromise;
  }

  filterByMonth({ year, month }) {
    const currentKey = `${year}-${String(month).padStart(2, "0")}`;
    const monthData = Object.fromEntries(
      Object.entries(this.incomeExpenseData)
        .filter(([key]) => key.startsWith(currentKey))
        .sort((a, b) => new Date(a[0]) - new Date(b[0])),
    );

    return monthData;
  }

  getIncomeExpenseData([year, month] = []) {
    if (year && month) {
      return this.filterByMonth({ year, month });
    } else {
      return this.incomeExpenseData;
    }
  }

  // incomeExpenseData 업데이트
  // TODO: add, update 함수를 분리해서 작성하면 좋을 듯
  updateIncomeExpenseData(dateInputValue, newIncomeExpense) {
    // item update
    if (newIncomeExpense.id != null) {
      const updateTarget = this.incomeExpenseData[dateInputValue].find(
        (data) => data.id === newIncomeExpense.id,
      );
      updateTarget.type = newIncomeExpense.type;
      updateTarget.money = newIncomeExpense.money;
      updateTarget.description = newIncomeExpense.description;
      updateTarget.payment = newIncomeExpense.payment;
      updateTarget.tag = newIncomeExpense.tag;
    } else {
      // item add
      // 해당 일 데이터 가져오기
      const dateData = this.incomeExpenseData[dateInputValue];
      if (dateData) {
        // ID 생성 (해당 날짜 데이터의 max ID + 1)
        const dataID = dateData[dateData.length - 1].id + 1;
        newIncomeExpense.id = dataID;

        // dateData에 새로운 지출/수입 추가
        dateData.push(newIncomeExpense);

        // date 데이터 비어있을 때
      } else {
        newIncomeExpense.id = 0;
        this.incomeExpenseData[dateInputValue] = [newIncomeExpense];
      }
    }
    this.notify();
  }

  delIncomeExpenseData(date, targetDataID) {
    const newIncomeExpenseDailyData = this.incomeExpenseData[date].filter(
      (data) => data.id !== targetDataID,
    );
    if (newIncomeExpenseDailyData.length > 0) {
      this.incomeExpenseData[date] = newIncomeExpenseDailyData;
    } else {
      delete this.incomeExpenseData[date];
    }
    this.notify();
  }

  subscribe(listener) {
    this.listenrs.push(listener);
  }

  notify() {
    this.listenrs.forEach((listener) => {
      listener();
    });
  }
}

export const incomeExpenseStore = new IncomeExpenseStore();
