import { formatMoney } from "../utils/format.js";
import { dateStore, transactionStore } from "../store/index.js";
import { CATEGORY_NAME } from "../constants/category.js";
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

// 최신 6개월(이번달 포함) 카테고리 별 지출 총합 계산 및 출력
function logLast6MonthsTotalExpense(year, month, category) {
  const totalAmountByMonth = {};

  for (let i = 0; i < 6; i++) {
    // 월이 0 이하일 때 연도/월 보정
    const calcYear = year - Math.floor((12 - month) / 12);
    const calcMonth = ((month - 1 - i + 12) % 12) + 1;
    const transactions = transactionStore.getTransactionsByCategory(
      calcYear,
      calcMonth,
      category
    );
    const { totalExpenseAmount } = totalExpenseData(transactions || []);
    totalAmountByMonth[calcMonth] = totalExpenseAmount;
  }
  return totalAmountByMonth;
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

  // legend-container 내 transaction-row 클릭 시 카테고리명 콘솔 출력
  const legendTable = container.querySelector(".legend-container");
  if (legendTable) {
    legendTable.addEventListener("click", (e) => {
      const legendItem = e.target.closest(".transaction-row");
      if (legendItem && legendTable.contains(legendItem)) {
        const categoryName = legendItem
          .querySelector(".td-category")
          .textContent.trim();
        const year = dateStore.getYear();
        const month = dateStore.getMonth();
        const totalAmountByMonth = logLast6MonthsTotalExpense(
          year,
          month,
          categoryName
        );
        console.log(categoryName, totalAmountByMonth);
        const lineChartContainer = document.querySelector(
          "#line-chart-container"
        );
        lineChartContainer.style.display = "block";
        renderLineChart(lineChartContainer, totalAmountByMonth);
      }
    });
  }
}

function renderLineChart(container, totalAmountByMonth) {
  // 기존에 있던 canvas 모두 제거
  Array.from(container.querySelectorAll("canvas")).forEach((el) => el.remove());

  const lineChart = document.createElement("canvas");
  lineChart.width = 840;
  lineChart.height = 572;
  container.appendChild(lineChart);
  const ctx = lineChart.getContext("2d");

  const values = Object.values(totalAmountByMonth);
  const months = Object.keys(totalAmountByMonth);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = maxValue - minValue || 1; // 0 방지
  const chartHeight = 500;
  const chartWidth = 700;
  const offsetX = 70;
  const offsetY = 36;
  const pointGap = chartWidth / (months.length - 1);

  // y좌표: (value - minValue) * scale
  const scale = chartHeight / range;

  ctx.beginPath();
  months.forEach((month, index) => {
    const value = totalAmountByMonth[month];
    const x = offsetX + index * pointGap;
    const y = offsetY + chartHeight - (value - minValue) * scale;
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.strokeStyle = "#36A2EB";
  ctx.lineWidth = 2;
  ctx.stroke();
}
