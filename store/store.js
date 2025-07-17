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
  addRecordToStore({ recordId, date, item }) {
    // record에 추가하려는 날짜에 대한 정보가 이미 있나 확인
    const foundRecord = this.records.find((record) => record.date.toString() === date.toString());
    if (foundRecord) {
      // 이미 있는 날짜라면 해당 날짜의 items 배열에 추가
      foundRecord.items.push(item);
    } else {
      // 없는 날짜라면 record에 날짜 포함한 새 객체 생성
      this.records.push({
        id: recordId,
        date,
        items: [item],
      });
    }
    this.notify();
  },
  deleteRecordFromStore(dateId, itemId) {
    this.records = this.records.reduce((acc, record) => {
      // 삭제하려는 레코드의 날짜의 items 배열에 접근
      if (record.id.toString() === dateId.toString()) {
        const filteredItems = record.items.filter(
          (item) => item.id.toString() !== itemId.toString()
        );

        // 삭제 결과 해당 날짜의 item이 남아있다면 남은 items를 반환
        if (filteredItems.length > 0) {
          acc.push({ ...record, items: filteredItems });
        }
        // item 배열이 없다면 해당 날짜의 객체는 사라짐
      } else {
        acc.push(record); // 삭제 대상 날짜가 아니므로 그대로 유지
      }
      return acc;
    }, []);

    this.notify();
  },
  updateRecordInStore({ dateId, itemId, updatedItem }) {
    this.records = this.records.map((record) => {
      if (record.id.toString() === dateId.toString()) {
        return {
          ...record,
          items: record.items.map((item) =>
            item.id.toString() === itemId.toString() ? { ...item, ...updatedItem } : item
          ),
        };
      }
      return record;
    });
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
