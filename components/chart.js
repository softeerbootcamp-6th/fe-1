import { formatMoney } from "../utils/format.js";
import { dateStore, transactionStore } from "../store/index.js";
import { CATEGORY_COLORS, CATEGORY_NAME } from "../constants/category.js";
import { getCategoryColor } from "../utils/style.js";
import { totalExpenseData } from "../utils/transaction.js";

// 카테고리별 지출 합계 및 퍼센트 구하기
function getExpenseByCategory(totalExpenseTransactions, totalExpenseAmount) {
  const expenseByCategory = {};
  totalExpenseTransactions.forEach((transaction) => {
    const cat = transaction.category;
    const amount = transaction.amount;
    expenseByCategory[cat] = {
      amount,
      percent: (amount / totalExpenseAmount) * 100,
    };
  });
  return { expenseByCategory };
}

function createLegend(categories, expenseByCategory, totalExpenseAmount) {
  const dailyInfoTemplate = `
    <div class="daily-info serif-14 flex-between">
      <div>이번 달 지출 금액</div>
      <div>${formatMoney(totalExpenseAmount) || 0}원</div>
    </div>
    `;

  const legendTemplate = categories.reduce((acc, cat) => {
    return (
      acc +
      `
        <tr class="flex-between transaction-row">
            <td class="td-category light-12 category-${
              CATEGORY_NAME[cat] || "미분류"
            }">${cat}</td>
            <td class="light-14 legend-percent">${expenseByCategory[
              cat
            ].percent.toFixed(1)}%</td>
            <td class="light-14 legend-amount">${formatMoney(
              expenseByCategory[cat].amount
            )}원</td>
          </tr>
        `
    );
  }, "");

  return (
    dailyInfoTemplate +
    `<table class="legend-container tbody-border"><tbody>${legendTemplate}</tbody></table>`
  );
}

// 도넛차트 그리기
export function renderDonutChart(container) {
  const year = dateStore.getYear();
  const month = dateStore.getMonth();

  const transactions = transactionStore.getTransactionsByYearMonth(year, month);

  const { totalExpenseTransactions, totalExpenseAmount } =
    totalExpenseData(transactions);

  const { expenseByCategory } = getExpenseByCategory(
    totalExpenseTransactions,
    totalExpenseAmount
  );

  const categories = Object.keys(expenseByCategory);

  // canvas 생성 및 추가
  const canvasContainer = container.querySelector("#donut-chart-canvas");
  const legendContainer = container.querySelector("#donut-chart-legend");
  const canvas = document.createElement("canvas");
  canvas.width = 420;
  canvas.height = 420;
  canvasContainer.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const cx = 210,
    cy = 210,
    r = 127,
    innerR = 80;

  let startAngle = -Math.PI / 2;
  categories.forEach((cat) => {
    const value = expenseByCategory[cat].amount;
    const angle = (value / totalExpenseAmount) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle, startAngle + angle);
    ctx.closePath();
    ctx.fillStyle = getCategoryColor(cat);
    ctx.fill();
    startAngle += angle;
  });

  // 도넛 중앙 구멍
  ctx.globalCompositeOperation = "destination-out"; // 현재 경로와 겹치는 부분을 지우는 모드
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2); // 중심에 작은 원을 그림
  ctx.fill();
  ctx.globalCompositeOperation = "source-over"; // 원래대로 그리기 모드 복귀

  renderLegend(
    legendContainer,
    categories,
    expenseByCategory,
    totalExpenseAmount
  );
}

export function renderLegend(
  container,
  categories,
  expenseByCategory,
  totalExpenseAmount
) {
  const legend = createLegend(
    categories,
    expenseByCategory,
    totalExpenseAmount
  );
  container.innerHTML = legend;
}
