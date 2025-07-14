export function formatMoney(num) {
  if (typeof num !== "number") return Number(num).toLocaleString("ko-KR");
  return num.toLocaleString("ko-KR");
}
