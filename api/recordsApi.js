import { store } from "../scripts/store.js";

const BASE_URL = "http://localhost:3001/records";

export function fetchRecords() {
  const res = fetch(BASE_URL)
    // fetch의 결과 promise를 받고, body를 반환
    .then((response) => {
      if (!response.ok) {
        throw new Error("서버 응답 실패");
      }
      return response.json();
    })
    // 비동기 함수인 response.json()의 완료를 기다렸다가 실행
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("fetchRecords 에러:", error);
    });

  return res;
}

//
export function addRecordsToServer({ date, recordId, item }) {
  const records = store.getRecords();
  const found = records.find((record) => record.date.toString() === date.toString());

  if (found) {
    return fetch(`${BASE_URL}/${found.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [...found.items, item] }),
    });
  } else {
    return fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: recordId,
        date,
        items: [item],
      }),
    });
  }
}

export function deleteRecordsFromServer(dateId, itemId) {
  // store에서 해당 날짜의 record를 가져옴
  const record = store.getRecords().find((record) => record.id.toString() === dateId.toString());

  if (!record) return;

  // 삭제하고자 하는 데이터를 제외한 items[]
  const updatedItems = record.items.filter((item) => {
    return item.id.toString() !== itemId.toString();
  });

  if (updatedItems.length === 0) {
    // 해당 날짜 객체 자체를 삭제
    return fetch(`${BASE_URL}/${dateId}`, {
      method: "DELETE",
    });
  } else {
    // 아이템만 삭제하고 나머지는 유지
    return fetch(`${BASE_URL}/${dateId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: updatedItems }),
    });
  }
}
