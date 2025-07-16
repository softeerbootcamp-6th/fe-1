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
  const found = records.find((record) => record.date === date);

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
