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

export function parseYMD(ymd) {
  const [year, month, day] = ymd.split("-").map(Number);
  return { year, month, day };
}

export function formatYMD(year, month, day) {
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

export function getCurrentYearMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}
