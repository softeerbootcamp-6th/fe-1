import { formatMoney } from "../utils/format.js";
import { dateStore, transactionStore } from "../store/index.js";
import { CATEGORY_COLORS, CATEGORY_NAME } from "../constants/category.js";
import { getCategoryColor } from "../utils/style.js";

// 카테고리별 지출 합계 및 퍼센트 구하기
function getExpenseByCategory(year, month) {
  const transactions = transactionStore.getTransactionsByYearMonth(year, month);
  const expenseByCategory = {};
  let totalExpense = 0;

  transactions.forEach(({ amount, category }) => {
    if (amount < 0) {
      const absAmount = Math.abs(amount);
      expenseByCategory[category] =
        (expenseByCategory[category] || 0) + absAmount;
      totalExpense += absAmount;
    }
  });

  // 카테고리별 { amount, percent } 객체로 변환
  const expenseByCategoryData = Object.fromEntries(
    Object.entries(expenseByCategory).map(([cat, amount]) => [
      cat,
      {
        amount,
        percent: totalExpense > 0 ? (amount / totalExpense) * 100 : 0,
      },
    ])
  );

  return { expenseByCategoryData, totalExpense };
}

function createLegend(categories, expenseByCategory, totalExpense) {
  const dailyInfoTemplate = `
  <div class="daily-info serif-14 flex-between">
    <div>이번 달 지출 금액</div>
    <div>${formatMoney(totalExpense)}원</div>
  </div>
  `;
  let legendTemplate = '<table class="legend-container tbody-border"><tbody>';
  categories.forEach((cat) => {
    legendTemplate += `
      <tr class="flex-between">
        <td class="td-category light-12 category-${
          CATEGORY_NAME[cat] || "미분류"
        }">${cat}</td>
        <td class="flex-row legend-item">
            <div class="light-14 legend-percent">${expenseByCategory[
              cat
            ].percent.toFixed(1)}%</div>
            <div class="light-14 legend-amount">${formatMoney(
              expenseByCategory[cat].amount
            )}원</div>
        </td>
      </tr>
    `;
  });
  legendTemplate += "</tbody></table>";
  return dailyInfoTemplate + legendTemplate;
}

// 도넛차트 그리기
export function renderDonutChart(container) {
  const year = dateStore.getYear();
  const month = dateStore.getMonth();
  const { expenseByCategoryData, totalExpense } = getExpenseByCategory(
    year,
    month
  );

  const categories = Object.keys(expenseByCategoryData);
  const values = Object.values(expenseByCategoryData);

  // canvas 생성 및 추가
  const canvas = document.createElement("canvas");
  canvas.width = 420;
  canvas.height = 420;

  const canvasContainer = container.querySelector("#donut-chart-canvas");
  canvasContainer.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const cx = 210,
    cy = 210,
    r = 127,
    innerR = 80;

  let startAngle = -Math.PI / 2;
  categories.forEach((cat) => {
    const value = expenseByCategoryData[cat].amount;
    const angle = (value / totalExpense) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle, startAngle + angle);
    ctx.closePath();
    ctx.fillStyle = getCategoryColor(cat);
    ctx.fill();
    startAngle += angle;
  });

  // 도넛 중앙 구멍
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";

  const legendContainer = container.querySelector("#donut-chart-legend");
  renderLegend(
    legendContainer,
    categories,
    expenseByCategoryData,
    totalExpense
  );
}

export function renderLegend(container, categories) {
  const year = dateStore.getYear();
  const month = dateStore.getMonth();
  const { expenseByCategoryData, totalExpense } = getExpenseByCategory(
    year,
    month
  );
  const legend = createLegend(categories, expenseByCategoryData, totalExpense);
  container.innerHTML = legend;
}
