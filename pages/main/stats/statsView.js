// 통계 뷰 구현
import { sharedState } from "../../../store/state.js";
import { store } from "../../../store/store.js";
export function initStatsView() {
  renderDonutChart();
  renderExpenseSummary();
}

// 도넛 차트 렌더링
function renderDonutChart() {
  const donutChartContainer = document.getElementById("donut-chart");
  donutChartContainer.innerHTML = "";

  const { currentMonth, currentYear } = store.getState();

  // 현재 월에 해당하는 지출 항목들만 필터링
  const currentMonthStr = `${currentYear}-${String(currentMonth).padStart(
    2,
    "0"
  )}`;
  const currentMonthExpenses = sharedState.entries.filter(
    (entry) => entry.date.startsWith(currentMonthStr) && !entry.isIncome
  );

  if (currentMonthExpenses.length === 0) {
    donutChartContainer.innerHTML =
      '<div class="no-data">데이터가 없습니다.</div>';
    return;
  }

  // 카테고리별로 그룹화하여 합계 계산
  const categoryTotals = {};
  let totalExpense = 0;

  currentMonthExpenses.forEach((entry) => {
    if (!categoryTotals[entry.category]) {
      categoryTotals[entry.category] = 0;
    }
    categoryTotals[entry.category] += entry.amount;
    totalExpense += entry.amount;
  });

  // 카테고리별 합계를 내림차순으로 정렬
  const sortedCategories = Object.keys(categoryTotals).sort(
    (a, b) => categoryTotals[b] - categoryTotals[a]
  );

  // 도넛 차트 생성
  let startAngle = 0;

  sortedCategories.forEach((category) => {
    const amount = categoryTotals[category];
    const percentage = amount / totalExpense;
    const angleSize = percentage * 360;

    // 도넛 세그먼트 생성
    const segment = document.createElement("div");
    segment.className = "donut-segment";
    segment.style.transform = `rotate(${startAngle}deg)`;

    // 카테고리 색상 적용
    const categoryColor = getCategoryColor(category);
    segment.style.backgroundColor = categoryColor;

    // 단순화된 방식으로 구현
    segment.style.clipPath =
      "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)";

    donutChartContainer.appendChild(segment);

    startAngle += angleSize;
  });

  // 가운데 흰색 원 (도넛 홀)
  const donutHole = document.createElement("div");
  donutHole.className = "donut-hole";

  const totalAmountElement = document.createElement("div");
  totalAmountElement.className = "donut-total";
  totalAmountElement.textContent = `${totalExpense.toLocaleString()}원`;

  const totalLabelElement = document.createElement("div");
  totalLabelElement.className = "donut-label";
  totalLabelElement.textContent = "총 지출액";

  donutHole.appendChild(totalAmountElement);
  donutHole.appendChild(totalLabelElement);

  donutChartContainer.appendChild(donutHole);
}

// 지출 내역 요약 렌더링
function renderExpenseSummary() {
  const expenseListContainer = document.getElementById("expense-list");
  const monthTotalExpenseElement = document.getElementById(
    "month-total-expense"
  );
  const { currentMonth, currentYear } = store.getState();
  expenseListContainer.innerHTML = "";

  // 현재 월에 해당하는 지출 항목들만 필터링
  const currentMonthStr = `${currentYear}-${String(currentMonth).padStart(
    2,
    "0"
  )}`;
  const currentMonthExpenses = sharedState.entries.filter(
    (entry) => entry.date.startsWith(currentMonthStr) && !entry.isIncome
  );

  if (currentMonthExpenses.length === 0) {
    expenseListContainer.innerHTML =
      '<div class="no-data">데이터가 없습니다.</div>';
    monthTotalExpenseElement.textContent = "0원";
    return;
  }

  // 카테고리별로 그룹화하여 합계 계산
  const categoryTotals = {};
  let totalExpense = 0;

  currentMonthExpenses.forEach((entry) => {
    if (!categoryTotals[entry.category]) {
      categoryTotals[entry.category] = 0;
    }
    categoryTotals[entry.category] += entry.amount;
    totalExpense += entry.amount;
  });

  // 월 총 지출액 표시
  monthTotalExpenseElement.textContent = `${totalExpense.toLocaleString()}원`;

  // 카테고리별 합계를 내림차순으로 정렬
  const sortedCategories = Object.keys(categoryTotals).sort(
    (a, b) => categoryTotals[b] - categoryTotals[a]
  );

  // 카테고리별 지출 내역 생성
  sortedCategories.forEach((category) => {
    const amount = categoryTotals[category];
    const percentage = ((amount / totalExpense) * 100).toFixed(1);

    const expenseItem = document.createElement("div");
    expenseItem.className = "expense-item";

    const categoryElement = document.createElement("div");
    categoryElement.className = "expense-category";

    const colorDot = document.createElement("div");
    colorDot.className = "category-color-dot";
    colorDot.style.backgroundColor = getCategoryColor(category);

    const categoryName = document.createElement("span");
    categoryName.textContent = category;

    categoryElement.appendChild(colorDot);
    categoryElement.appendChild(categoryName);

    const detailsElement = document.createElement("div");
    detailsElement.className = "expense-details";

    const percentElement = document.createElement("div");
    percentElement.className = "expense-percent";
    percentElement.textContent = `${percentage}%`;

    const amountElement = document.createElement("div");
    amountElement.className = "expense-amount";
    amountElement.textContent = `${amount.toLocaleString()}원`;

    detailsElement.appendChild(percentElement);
    detailsElement.appendChild(amountElement);

    expenseItem.appendChild(categoryElement);
    expenseItem.appendChild(detailsElement);

    expenseListContainer.appendChild(expenseItem);
  });
}

// 카테고리별 실제 색상 값 반환
function getCategoryColor(category) {
  const categoryColors = {
    생활: "var(--pastel-perano)",
    식비: "var(--pastel-onahau)",
    교통: "var(--pastel-glacier)",
    "쇼핑/뷰티": "var(--pastel-citron)",
    "의료/건강": "var(--pastel-cruise)",
    "문화/여가": "var(--pastel-perfume)",
    미분류: "var(--pastel-lavenderPink)",
    월급: "var(--pastel-porsche)",
    용돈: "var(--pastel-caper)",
    기타수입: "var(--pastel-almondFrost)",
  };

  return categoryColors[category] || "var(--pastel-lavenderPink)";
}

// 통계 업데이트 함수 - 헤더의 월 변경시 호출
export function updateStatsView() {
  renderDonutChart();
  renderExpenseSummary();
}
