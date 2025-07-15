// YYYY-MM-DD 형식을 M월 D일로 format
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { month: "long", day: "numeric", weekday: "long" };
  return date.toLocaleDateString("ko-KR", options);
}

// YYYY-MM-DD 형식으로 날짜 받기
export function getDateYMD(date) {
  return date.toISOString().slice(0, 10);
}
