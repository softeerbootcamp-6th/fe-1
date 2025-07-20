export class Store {
  constructor(initialState = {}) {
    this.state = { ...initialState };
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((fn) => fn(this.state));
  }

  getState() {
    return { ...this.state };
  }

  reset(key) {
    if (key in this.state) {
      this.setState({ [key]: null });
    }
  }
}
export const store = new Store({
  selctedMethod: null,
  selectedCategory: null,
  isIncome: true,
  entryId: null,
  currentMonth: new Date().getMonth() + 1,
  currentYear: new Date().getFullYear(),
});
