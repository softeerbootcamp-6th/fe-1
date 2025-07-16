import { fetchRecords } from "../api/recordsApi.js";

export const store = {
  records: [],
  observers: [],
  dateObservers: [],
  currentDate: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  },
  init() {
    return fetchRecords().then((res) => {
      this.records = res;
      this.notify();
    });
  },
  getRecords() {
    return this.records;
  },
  setRecords(newRecords) {
    this.records = newRecords;
    this.notify();
  },
  addRecordToStore(record) {
    this.records.push(record);
    this.notify();
  },
  deleteRecordToStore(itemId) {
    // todo: id에 해당하는 레코드 지워서 반영

    this.notify();
  },

  getDate() {
    return this.currentDate;
  },
  setDate(year, month) {
    this.currentDate = { year, month };
    this.notifyDate();
  },
  subscribe(callback) {
    this.observers.push(callback);
  },
  subscribeDate(cb) {
    this.dateObservers.push(cb);
  },

  notify() {
    this.observers.forEach((cb) => cb(this.records));
  },
  notifyDate() {
    this.dateObservers.forEach((cb) => cb(this.currentDate));
  },
};
