// prototype 방식을 활용해서 Observer 생성자 함수 정의

// store에서  call(this)를 통해 상태 상속
export function Observer() {
  this.observers = [];
}

Observer.prototype.subscribe = function (cb) {
  this.observers.push(cb);
};

Observer.prototype.notify = function (data) {
  this.observers.forEach((cb) => cb(data));
};
