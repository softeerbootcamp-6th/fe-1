export class Store {
  constructor(initData) {
    this.data = initData;
    this.subscribers = [];
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter(
      (partCallback) => partCallback !== callback
    );
  }

  notify() {
    this.subscribers.forEach((callback) => callback(this.data));
  }

  dispatch() {}
}
