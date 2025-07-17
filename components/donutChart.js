import { dateStore, transactionStore } from "../store/index.js";
import { totalExpenseData } from "../utils/transaction.js";
import { getCategoryColor } from "../utils/style.js";
import { renderLegend, getExpenseByCategory } from "./chart.js";

export function renderDonutChartSVG(container) {
  const year = dateStore.getYear();
  const month = dateStore.getMonth();

  const transactions = transactionStore.getTransactionsByYearMonth(year, month);

  const { totalExpenseTransactions, totalExpenseAmount } =
    totalExpenseData(transactions);

  const { expenseByCategory } = getExpenseByCategory(
    totalExpenseTransactions,
    totalExpenseAmount
  );
  console.log(expenseByCategory);

  const categories = Object.keys(expenseByCategory);

  const svgContainer = container.querySelector("#donut-chart-canvas");
  const legendContainer = container.querySelector("#donut-chart-legend");
  svgContainer.innerHTML = "";

  const width = 420;
  const height = 420;
  const cx = width / 2;
  const cy = height / 2;
  const r = 127;
  const innerR = 80;

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.style.overflow = "visible"; // 확장 시 잘림 방지

  // 기본 스타일 삽입
  const style = document.createElement("style");
  style.textContent = `
      .donut-slice {
        transform-origin: ${cx}px ${cy}px;
        transition: transform 0.3s ease;
        cursor: pointer;
      }
  
      .donut-slice:hover {
        transform: scale(1.1);
      }
    `;
  document.head.appendChild(style);

  let startAngle = -Math.PI / 2;

  categories.forEach((cat) => {
    const angle = (expenseByCategory[cat].percent / 100) * Math.PI * 2;
    const endAngle = startAngle + angle;
    const path = document.createElementNS(svgNS, "path");

    // 360도(2π)와 거의 같은 경우(소수점 오차 포함)
    if (Math.abs(angle - Math.PI * 2) < 1e-6) {
      // 외부 원호(반원 2번)
      const d = [
        `M ${cx} ${cy - r}`,
        `A ${r} ${r} 0 1 1 ${cx} ${cy + r}`,
        `A ${r} ${r} 0 1 1 ${cx} ${cy - r}`,
        `L ${cx} ${cy - innerR}`,
        `A ${innerR} ${innerR} 0 1 0 ${cx} ${cy + innerR}`,
        `A ${innerR} ${innerR} 0 1 0 ${cx} ${cy - innerR}`,
        "Z",
      ].join(" ");
      path.setAttribute("d", d);
    } else {
      const largeArcFlag = angle > Math.PI ? 1 : 0;
      // x1, y1: 외부 원호 시작점 (startAngle, 바깥 반지름)
      const x1 = cx + r * Math.cos(startAngle);
      const y1 = cy + r * Math.sin(startAngle);
      // x2, y2: 외부 원호 끝점 (endAngle, 바깥 반지름)
      const x2 = cx + r * Math.cos(endAngle);
      const y2 = cy + r * Math.sin(endAngle);
      // x3, y3: 내부 원호 끝점 (endAngle, 안쪽 반지름)
      const x3 = cx + innerR * Math.cos(endAngle);
      const y3 = cy + innerR * Math.sin(endAngle);
      // x4, y4: 내부 원호 시작점 (startAngle, 안쪽 반지름)
      const x4 = cx + innerR * Math.cos(startAngle);
      const y4 = cy + innerR * Math.sin(startAngle);
      const d = [
        `M ${x1} ${y1}`,
        `A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `L ${x3} ${y3}`,
        `A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
        "Z",
      ].join(" ");
      path.setAttribute("d", d);
    }

    path.setAttribute("fill", getCategoryColor(cat));
    path.classList.add("donut-slice");
    svg.appendChild(path);

    startAngle = endAngle;
  });

  svgContainer.appendChild(svg);

  renderLegend(
    legendContainer,
    categories,
    expenseByCategory,
    totalExpenseAmount
  );
}
