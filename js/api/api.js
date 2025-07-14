// 저장하기
export async function saveEntriesToServer(month, entries) {
  await fetch(`http://localhost:3000/api/entries/${month}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entries)
  });
}

// 불러오기
export async function loadEntriesFromServer(month) {
  const res = await fetch(`http://localhost:3000/api/entries/${month}`);
  const data = await res.json();
  console.log("Loaded entries:", data);
  return data;
}

// 더미 데이터 삭제
export async function deleteDummyEntries() {
  await fetch('http://localhost:3000/api/entries', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
}