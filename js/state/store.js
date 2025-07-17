class DateStore {
  constructor() {
    this.state = {
      selectedCategory: null,
      selectedMethod: null,
    };
    this.listeners = [];
  }
  subscribe(li) {
    this.listeners.push(li);
  }
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  }
  setCategory(category) {
    this.setState({ selectedCategory: category });
  }
}

export const dateStore = new DateStore();
