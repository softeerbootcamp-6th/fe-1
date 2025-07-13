// YYYY-MM-DD 형식을 M월 D일로 format
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { month: "long", day: "numeric", weekday: "long" };
  return date.toLocaleDateString("ko-KR", options);
}
