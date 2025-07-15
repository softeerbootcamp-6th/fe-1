let year = 2025;
let month = 8;
const listeners = [];

// getter
function getYear() {
  return year;
}
function getMonth() {
  return month;
}

// setter
function setYear(newYear) {
  year = newYear;
  notify(); // state 바뀌었음을 알림
}

function setMonth(newMonth) {
  month = newMonth;
  notify();
}

// 상태가 바뀔 때 실행할 함수들 추가
// 할 일 목록 등록
function subscribe(listener) {
  listeners.push(listener);
}

// listener들에게 state 변경을 알려주기
function notify() {
  listeners.forEach(listener => listener({ year, month }));
}

export default {
  getYear,
  getMonth,
  setYear,
  setMonth,
  subscribe,
};
