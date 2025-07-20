import { Observer } from "./observer.js";

function DateStore() {
  // Observer 생성사 호출 - 구독 기능 상속
  Observer.call(this);
  this.currentDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1 };
}

// Observer의 함수를 활용할 수 있게 prototype 정의
DateStore.prototype = Object.create(Observer.prototype);
DateStore.prototype.constructor = DateStore;

// 현재 연도 / 월을 리턴하는 함수
DateStore.prototype.getDate = function () {
  return this.currentDate;
};

// 날짜를 새로 설정하고 구독 함수에게 알림 보내는 함수
DateStore.prototype.setDate = function (year, month) {
  this.currentDate = { year, month };
  this.notify({ year, month });
};

export const dateStore = new DateStore();
