import { formatMoney } from "../utils/format.js";
import { dateStore, transactionStore } from "../store/index.js";
import { CATEGORY_COLORS, CATEGORY_NAME } from "../constants/category.js";

// 카테고리별 실제 색상값 반환
function getCategoryColor(category) {
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  const cssVar = CATEGORY_COLORS[category];
  if (!cssVar) return "--colorchip-10";

  const match = cssVar.match(/var\((--[\w-]+)\)/);
  if (match) {
    return styles.getPropertyValue(match[1]);
  }

  return cssVar;
}

// 카테고리별 지출 합계 구하기
function getExpenseByCategory(year, month) {
  const transactions = transactionStore.getTransactionsByYearMonth(year, month);
  const expenseByCategory = {};

  transactions.forEach((t) => {
    if (t.amount < 0) {
      const cat = t.category;
      if (!expenseByCategory[cat]) expenseByCategory[cat] = 0;
      expenseByCategory[cat] += Math.abs(t.amount);
    }
  });

  return expenseByCategory;
}

function createLegend(categories, expenseByCategory) {
  let legendTemplate = '<div class="legend-container">';
  categories.forEach((cat, i) => {
    legendTemplate += `
      <div class="legend-item category-${CATEGORY_NAME[cat]}">
        ${cat} : ${formatMoney(expenseByCategory[cat])}원
      </div>
    `;
  });
  legendTemplate += "</div>";
  return legendTemplate;
}

// 도넛차트 그리기
export function renderDonutChart(container) {
  const year = dateStore.getYear();
  const month = dateStore.getMonth();
  const expenseByCategory = getExpenseByCategory(year, month);

  const categories = Object.keys(expenseByCategory);
  const values = Object.values(expenseByCategory);
  const total = values.reduce((a, b) => a + b, 0);

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
    const value = expenseByCategory[cat];
    const angle = (value / total) * Math.PI * 2;
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
  renderLegend(legendContainer, categories, expenseByCategory);
}

export function renderLegend(container, categories, expenseByCategory) {
  const legend = createLegend(categories, expenseByCategory);
  container.innerHTML = legend;
}
