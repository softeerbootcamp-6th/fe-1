import { Observer } from "./observer.js";
import { fetchRecords } from "../api/recordsApi.js";

function RecordStore() {
  // Observer 생성자 호출 - 구독 기능 상속
  Observer.call(this);
  this.records = [];
}

// RecordStore에서 Observer의 함수를 활용할 수 있게 prototype 정의
RecordStore.prototype = Object.create(Observer.prototype);
RecordStore.prototype.constructor = RecordStore;

// 초기 렌더링 시 호출되는 함수 - api 받아와서 레코드 초기화
RecordStore.prototype.init = function () {
  return fetchRecords().then((res) => {
    this.records = res;

    this.notify();
  });
};

// 현재 레코드 값 불러오는 함수
RecordStore.prototype.getRecords = function () {
  return this.records;
};

// 레코드 값 설정 함수
RecordStore.prototype.setRecord = function (newRecords) {
  this.records = newRecords;
  this.notify();
};

// 레코드 추가 함수 - 날짜에 따라 새 아이템을 record에 추가 / items[]에 추가
RecordStore.prototype.addRecordToStore = function ({ recordId, date, item }) {
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
};

// 레코드 삭제 함수 - 해당 날짜의 아이템을 삭제하고, 아이템 배열이 없다면 레코드 자체도 제거
RecordStore.prototype.deleteRecordFromStore = function (dateId, itemId) {
  this.records = this.records.reduce((acc, record) => {
    // 삭제하려는 레코드의 날짜의 items 배열에 접근
    if (record.id.toString() === dateId.toString()) {
      const filteredItems = record.items.filter((item) => item.id.toString() !== itemId.toString());

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
};

// 레코드 수정 함수 - 해당 날짜의 아이템을 업데이트
RecordStore.prototype.updateRecordInStore = function ({ dateId, itemId, updatedItem }) {
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
};

// 하나의 인스턴스만 생성하여 export
export const recordStore = new RecordStore();
