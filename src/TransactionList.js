// items 날짜별로 가공, 날짜별로 렌더링

/*
    date: YYYY-MM-DD
    category: 10개 중 1개; string,
    description: string,
    method: 결제 수단; 사용자 임의 입력; string,
    type: "withdraw" | "deposit",
    amount: number
*/

const items = [
  {
    date: "2025-08-05",
    category: "교통",
    description: "후불 교통비 결제",
    method: "현대카드",
    type: "deposit",
    amount: "10000000",
  },
  {
    date: "2025-07-04",
    category: "문화/여가",
    description: "스트리밍 서비스 정기 결제",
    method: "현대카드",
    type: "withdraw",
    amount: "10900",
  },
  {
    date: "2025-08-04",
    category: "문화/여가",
    description: "스트리밍 서비스 정기 결제",
    method: "현대카드",
    type: "withdraw",
    amount: "10900",
  },
  {
    date: "2025-08-04",
    category: "교통",
    description: "후불 교통비 결제",
    method: "현대카드",
    type: "withdraw",
    amount: "45340",
  },
  {
    date: "2025-08-05",
    category: "문화/여가",
    description: "스트리밍 서비스 정기 결제",
    method: "현대카드",
    type: "withdraw",

    amount: "10900",
  },
  {
    date: "2025-08-05",
    category: "교통",
    description: "후불 교통비 결제",
    method: "현대카드",
    type: "withdraw",
    amount: "45340",
  },
];

/* 같은 날짜별로 그룹화하는 함수 */
function groupItemsByDate(items) {
  const group = {};
  items.forEach((item) => {
    const date = item.date;
    if (!group[date]) group[date] = [];
    group[date].push(item);
  });
  return group;
}

/* item들의 입출금내역 총합 계산하는 함수; {withdraw, deposit} */
function calculateSummary(items) {
  return items.reduce(
    (acc, item) => {
      const amount = Number(item.amount);
      if (item.type === "withdraw") acc.withdraw += amount;
      else acc.deposit += amount;
      return acc;
    },
    { withdraw: 0, deposit: 0 }
  );
}

/* YYYY-MM-DD 형식을 M월 D일로 format */
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { month: "long", day: "numeric", weekday: "long" };
  return date.toLocaleDateString("ko-KR", options);
}

function renderItemHTML(item) {
  const amount = Number(item.amount);
  return `
      <div class="flex-row-between item">
        <div class="category">${item.category}</div>
        <p class="description">${item.description}</p>
        <p class="method">${item.method}</p>
        <div class="flex-row-between">
        <div class="amount ${item.type === "withdraw" ? "minus" : "plus"}">
          ${item.type === "withdraw" ? "-" : "+"}${amount.toLocaleString()}원
        </div>
        <button class="delete-btn">삭제</button>
        </div>
      </div>
    `;
}

function renderDaySection(dateStr, items) {
  const summary = calculateSummary(items);
  const dateTitle = formatDate(dateStr);
  const summaryText =
    summary.deposit > 0
      ? `수입 ${summary.deposit.toLocaleString()}원 ${
          summary.withdraw > 0
            ? "지출 " + summary.withdraw.toLocaleString() + "원"
            : ""
        }`
      : `지출 ${summary.withdraw.toLocaleString()}원`;

  const itemHTML = items.map(renderItemHTML).join("");

  return `
      <div class="day-section">
        <div class="day-header">
          <span class="date">${dateTitle}</span>
          <span class="summary">${summaryText}</span>
        </div>
        <div class="transactions">
          ${itemHTML}
        </div>
      </div>
    `;
}

export function renderTransactionItems() {
  const container = document.getElementById("transaction-list");
  container.innerHTML = "";

  // 월별로 데이터 전처리
  // 채우기

  // 날짜별로 데이터 그룹화
  const grouped = groupItemsByDate(items);
  // 날짜순으로 정렬
  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  //
  sortedDates.forEach((dateStr) => {
    const html = renderDaySection(dateStr, grouped[dateStr]);
    container.innerHTML += html;
  });

  // 이벤트 위임: button에서 이벤트 위임 받고, click 발생하면 그대로 삭제되도록 한다
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const itemDel = e.target.closest(".item"); // 가장 가까운 item을 찾는 것
      itemDel.remove();
      //  삭제 이후 지출/입금 금액 리렌더링
    }
  });

  return container;
}
