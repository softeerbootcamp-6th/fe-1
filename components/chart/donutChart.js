import { dateStore, transactionStore } from "../../store/index.js";
import { getTotalExpenseData } from "../../utils/transaction.js";
import { getCategoryColor } from "../../utils/style.js";
import {
  renderLegend,
  getExpenseByCategory,
  renderLineChartAndTransactionList,
} from "./chart.js";
import {
  TINY_NUMBER,
  PI,
  ANIMATION_DURATION,
  ANIMATION_DELAY,
  DONUT_CHART,
} from "../../constants/number.js";

// 도넛 슬라이스 생성 함수
function createDonutSlice(
  cat,
  startAngle,
  angle,
  cx,
  cy,
  r,
  innerR,
  svgNS,
  index
) {
  const endAngle = startAngle + angle;
  const path = document.createElementNS(svgNS, "path");

  // 360도(2π)와 거의 같은 경우(소수점 오차 포함)
  if (Math.abs(angle - PI * 2) < TINY_NUMBER) {
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
    const largeArcFlag = angle > PI ? 1 : 0;
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

  // animation
  path.style.transformOrigin = `${cx}px ${cy}px`;
  path.style.transform = "scale(0)";
  path.style.opacity = "0";
  path.style.animation = `donut-appear ${ANIMATION_DURATION}s ease-out ${
    index * ANIMATION_DELAY
  }s forwards`;

  path.addEventListener("animationend", () => {
    path.style.transform = "";
    path.style.opacity = "";
    path.style.animation = "";
  });

  return path;
}

// 도넛 텍스트 생성 함수
function createDonutText(
  cat,
  startAngle,
  angle,
  cx,
  cy,
  r,
  innerR,
  expenseByCategory,
  svgNS
) {
  const percent = expenseByCategory[cat].percent;

  const midAngle = startAngle + angle / 2;
  const textRadius = (r + innerR) / 2; // 바깥 반지름과 안쪽 반지름의 중간
  const textX = cx + textRadius * Math.cos(midAngle);
  const textY = cy + textRadius * Math.sin(midAngle);

  // 카테고리명 텍스트
  const categoryText = document.createElementNS(svgNS, "text");
  categoryText.setAttribute("x", textX);
  categoryText.setAttribute("y", textY - 5);
  categoryText.setAttribute("text-anchor", "middle");
  categoryText.setAttribute("dominant-baseline", "middle");
  categoryText.setAttribute("fill", "#000");
  categoryText.setAttribute("pointer-events", "none");
  categoryText.classList.add("light-12", "donut-text");
  categoryText.textContent = cat;

  // 퍼센트 텍스트
  const percentText = document.createElementNS(svgNS, "text");
  percentText.setAttribute("x", textX);
  percentText.setAttribute("y", textY + 10);
  percentText.setAttribute("text-anchor", "middle");
  percentText.setAttribute("dominant-baseline", "middle");
  percentText.setAttribute("fill", "#000");
  percentText.setAttribute("pointer-events", "none");
  percentText.classList.add("light-12", "donut-text");
  percentText.textContent = `${percent.toFixed(1)}%`;

  //percent가 3% 미만이면 텍스트 표시하지 않음
  if (percent < 3) {
    categoryText.setAttribute("fill", "none");
    percentText.setAttribute("fill", "none");
  }
  return [categoryText, percentText];
}

export function renderDonutChartSVG(container) {
  const year = dateStore.getYear();
  const month = dateStore.getMonth();

  const transactions = transactionStore.getTransactionsByYearMonth(year, month);

  const { totalExpenseTransactions, totalExpenseAmount } =
    getTotalExpenseData(transactions);

  const { expenseByCategory } = getExpenseByCategory(
    totalExpenseTransactions,
    totalExpenseAmount
  );

  const categories = Object.keys(expenseByCategory);

  const svgContainer = container.querySelector("#donut-chart-canvas");
  const legendContainer = container.querySelector("#donut-chart-legend");
  svgContainer.innerHTML = "";

  const width = DONUT_CHART.width;
  const height = DONUT_CHART.height;
  const cx = DONUT_CHART.cx;
  const cy = DONUT_CHART.cy;
  const r = DONUT_CHART.r;
  const innerR = DONUT_CHART.innerR;

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
    `;
  document.head.appendChild(style);

  let startAngle = -Math.PI / 2;

  // 모든 path(도넛 슬라이스)를 그리기
  categories.forEach((cat, index) => {
    const angle = (expenseByCategory[cat].percent / 100) * PI * 2;
    const path = createDonutSlice(
      cat,
      startAngle,
      angle,
      cx,
      cy,
      r,
      innerR,
      svgNS,
      index
    );
    path.setAttribute("data-category", cat);
    svg.appendChild(path);
    startAngle += angle;
  });

  // 모든 텍스트를 추가 (맨 위에 표시)
  startAngle = -PI / 2;
  const textElements = [];
  categories.forEach((cat) => {
    const angle = (expenseByCategory[cat].percent / 100) * PI * 2;
    const [categoryText, percentText] = createDonutText(
      cat,
      startAngle,
      angle,
      cx,
      cy,
      r,
      innerR,
      expenseByCategory,
      svgNS
    );
    categoryText.setAttribute("data-category", cat);
    percentText.setAttribute("data-category", cat);
    textElements.push({ category: cat, elements: [categoryText, percentText] });
    svg.appendChild(categoryText);
    svg.appendChild(percentText);
    startAngle += angle;
  });

  // 호버 이벤트 추가
  const slices = svg.querySelectorAll(".donut-slice");
  slices.forEach((slice) => {
    const category = slice.getAttribute("data-category");
    const relatedTexts = textElements
      .filter((item) => item.category === category)
      .flatMap((item) => item.elements);

    slice.addEventListener("click", () => {
      renderLineChartAndTransactionList(category);
    });
    slice.addEventListener("mouseenter", () => {
      relatedTexts.forEach((text) => {
        text.style.fontSize = "14px";
      });
    });

    slice.addEventListener("mouseleave", () => {
      relatedTexts.forEach((text) => {
        text.style.fontSize = "12px";
      });
    });
  });

  svgContainer.appendChild(svg);

  renderLegend(
    legendContainer,
    categories,
    expenseByCategory,
    totalExpenseAmount
  );
}
