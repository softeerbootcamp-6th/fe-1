// items 날짜별로 가공, 날짜별로 렌더링

/*
    category: 10개 중 1개; string,
    description: string,
    method: 결제 수단; 사용자 임의 입력; string,
    type: "withdraw" | "deposit",
    amount: number
*/

const items = [
  {
    category: "문화/여가",
    description: "스트리밍 서비스 정기 결제",
    method: "현대카드",
    type: "withdraw",
    amount: "10900",
  },
  {
    category: "교통",
    description: "후불 교통비 결제",
    method: "현대카드",
    type: "withdraw",
    amount: "45340",
  },
  {
    category: "문화/여가",
    description: "스트리밍 서비스 정기 결제",
    method: "현대카드",
    type: "withdraw",

    amount: "10900",
  },
  {
    category: "교통",
    description: "후불 교통비 결제",
    method: "현대카드",
    type: "withdraw",
    amount: "45340",
  },
];

export function renderTransactionItems() {
  const container = document.getElementById("transaction-list");
  container.className = "flex-column-center";
  container.innerHTML = items
    .map(
      (item) => `
    <div class="flex-row-between">
      <div class="category">${item.category}</div>
        <p class="description">${item.description}</p>
        <p class="method">${item.method}</p>
      <div class="amount ${item.type === "withdraw" ? "minus" : "plus"}">
        ${item.type === "withdraw" ? "-" : "+"}${item.amount.toLocaleString()}원
      </div>
    </div>
        `
    )
    .join("");
  return container;
}
