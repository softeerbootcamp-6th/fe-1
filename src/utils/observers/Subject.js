class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  unsubscribeAll() {
    this.observers = [];
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

export default Subject;
