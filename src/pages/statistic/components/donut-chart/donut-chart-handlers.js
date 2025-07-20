import { categoryColors } from "../../constants/category-colors.js";
import { formatAmount } from "../../../../utils/format-utils.js";
import { getFilteredData } from "../../../../utils/data-utils.js";
import { showCategoryTrendChart } from "../trend/trend-handlers.js";
import { transactionUtils } from "../../../../store/transaction-store.js";

// 기존 canvas 의 arc 함수를 svg path 형식으로 변환하는 함수
function describeArc(cx, cy, rOuter, rInner, startAngle, endAngle) {
  const polarToCartesian = (cx, cy, r, angle) => [
    cx + r * Math.cos(angle),
    cy + r * Math.sin(angle),
  ];
  const [x1, y1] = polarToCartesian(cx, cy, rOuter, startAngle);
  const [x2, y2] = polarToCartesian(cx, cy, rOuter, endAngle);
  const [x3, y3] = polarToCartesian(cx, cy, rInner, endAngle);
  const [x4, y4] = polarToCartesian(cx, cy, rInner, startAngle);
  const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

  return [
    `M ${x1} ${y1}`,
    `A ${rOuter} ${rOuter} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
    `L ${x3} ${y3}`,
    `A ${rInner} ${rInner} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
    "Z",
  ].join(" ");
}

// 도넛 차트 SVG 생성 함수
function renderDonutChartSVG(data, highlightCategory = null) {
  const chartPlaceholderEl = document.getElementById("chart-placeholder");
  // 기존 SVG 제거
  const existingSvg = chartPlaceholderEl.querySelector("#donut-chart");
  if (existingSvg) existingSvg.remove();

  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = cx - 30;
  const rInner = rOuter * 0.5;
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("id", "donut-chart");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  svg.style.display = "block";
  svg.style.margin = "0 auto";
  svg.style.background = "var(--neutral-surface-default)";

  if (!data.sortedCategories || data.sortedCategories.length === 0) {
    // 데이터 없음 표시
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", rOuter);
    circle.setAttribute("fill", "#e0e0e0");
    svg.appendChild(circle);
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", cx);
    text.setAttribute("y", cy + 6);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "#999");
    text.setAttribute("font-size", "16");
    text.textContent = "데이터 없음";
    svg.appendChild(text);
    chartPlaceholderEl.appendChild(svg);
    return;
  }

  let currentAngle = -Math.PI / 2;
  data.sortedCategories.forEach(([category, stats]) => {
    const sliceAngle = (stats.percentage / 100) * 2 * Math.PI;
    let startAngle = currentAngle;
    let endAngle = currentAngle + sliceAngle;
    const tinyNumber = 0.0001;
    const superTinyNumber = 0.0001;
    // 시작과 끝이 같으면(100%) endAngle을 살짝 줄임
    if (Math.abs(endAngle - startAngle) >= 2 * Math.PI - tinyNumber) {
      endAngle -= superTinyNumber;
    }
    let color = categoryColors[category] || categoryColors["기타"];
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute(
      "d",
      describeArc(cx, cy, rOuter, rInner, startAngle, endAngle)
    );
    path.setAttribute("fill", color);
    path.setAttribute("data-category", category);
    path.classList.add("donut-arc");
    // 클릭 이벤트: 트렌드 차트 표시 및 강조
    path.addEventListener("click", () => {
      renderDonutChartSVG(data, category); // 강조 다시 그림
      showCategoryTrendChart(category);
    });
    svg.appendChild(path);
    currentAngle = endAngle;
  });
  chartPlaceholderEl.appendChild(svg);
}

// 통계 데이터 계산 함수
async function calculateStatistics() {
  try {
    // store의 현재 데이터 사용
    const storeData = transactionUtils.getCurrentTransactions();

    // 해당 월의 데이터 가져오기
    const monthlyData = getFilteredData(storeData);
    // 지출 데이터만 필터링 (음수 금액)
    const expenseData = monthlyData.filter((item) => item.amount < 0);
    // 카테고리별 지출 집계
    const categoryStats = {};
    let totalExpense = 0;

    expenseData.forEach((item) => {
      const category = item.category || "미분류";
      const amount = Math.abs(item.amount);
      if (!categoryStats[category]) {
        categoryStats[category] = {
          amount: 0,
          count: 0,
          percentage: 0,
        };
      }
      categoryStats[category].amount += amount;
      categoryStats[category].count += 1;
      totalExpense += amount;
    });

    // 퍼센트 계산 (소수 첫째 자리까지)
    Object.keys(categoryStats).forEach((category) => {
      const percentage = (categoryStats[category].amount / totalExpense) * 1000;
      categoryStats[category].percentage = Math.round(percentage) / 10;
    });

    // 금액 순으로 정렬
    const sortedCategories = Object.entries(categoryStats).sort(
      ([, a], [, b]) => b.amount - a.amount
    );

    return {
      totalExpense,
      categoryStats: Object.fromEntries(sortedCategories),
      sortedCategories,
    };
  } catch (error) {
    console.error("통계 데이터 계산 실패:", error);
    return {
      totalExpense: 0,
      categoryStats: {},
      sortedCategories: [],
    };
  }
}

// 전체 통계 업데이트 함수
export async function initDonutChart() {
  try {
    const statisticsData = await calculateStatistics();
    // 총 지출 금액 업데이트 (요소가 있다면)
    const totalExpenseAmountEl = document.getElementById(
      "total-expense-amount"
    );
    if (totalExpenseAmountEl) {
      totalExpenseAmountEl.textContent = `${formatAmount(
        statisticsData.totalExpense
      )}원`;
    }
    renderDonutChartSVG(statisticsData);
  } catch (error) {
    console.error("통계 업데이트 실패:", error);
  }
}
