class DateStore {
  constructor() {
    this.year = 2025;
    this.month = 8;
    this.listeners = [];
  }

  // getter
  getYear() {
    return this.year;
  }
  getMonth() {
    return this.month;
  }

  // setter
  setYear(newYear) {
    this.year = newYear;
    this.notify(); // state 바뀌었음을 알림
  }

  setMonth(newMonth) {
    this.month = newMonth;
    this.notify();
  }

  // 상태가 바뀔 때 실행할 함수들 추가
  // 할 일 목록 등록
  subscribe(listener) {
    this.listeners.push(listener);
  }

  // listener들에게 state 변경을 알려주기
  notify() {
    this.listeners.forEach((listener) => listener({ year, month }));
  }
}

export const dateStore = new DateStore();
