// 저장하기
export async function saveEntriesToServer(month, entry) {
  await fetch(`http://localhost:3000/api/entry/${month}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry)
  });
}

// 불러오기
export async function loadEntriesFromServer(month) {
  const res = await fetch(`http://localhost:3000/api/entry/${month}`);
  const data = await res.json();
  console.log("Loaded entries:", data);
  return data;
}

// 더미 데이터 삭제
export async function deleteEntry(month, id) {
  await fetch(`http://localhost:3000/api/entry/${month}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
}