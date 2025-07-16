import { fetchRecords } from "../api/recordsApi.js";

export const store = {
  records: [],
  init() {
    return fetchRecords().then((res) => {
      this.records = res;
    });
  },
  getRecords() {
    return this.records;
  },
  setRecords(newRecords) {
    this.records = newRecords;
  },
  addRecord(record) {
    this.records.push(record);
  },
  deleteRecord(itemId) {
    this.setRecords();
  },
};
