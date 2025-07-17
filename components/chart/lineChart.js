import { formatMoney } from "../../utils/format.js";

export function renderGrid(
  svgNS,
  gridGroup,
  minValue,
  range,
  scale,
  offsetX,
  offsetY,
  chartWidth,
  chartHeight,
  months,
  pointGap
) {
  // 수평 그리드선 + y축 라벨
  const gridLineCount = 11;
  for (let i = 0; i <= gridLineCount; i++) {
    const value = minValue + (range * i) / gridLineCount;
    const y = offsetY + chartHeight - value * scale;

    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", offsetX);
    line.setAttribute("x2", offsetX + chartWidth);
    line.setAttribute("y1", y);
    line.setAttribute("y2", y);
    line.setAttribute("stroke", "#ddd");
    gridGroup.appendChild(line);
  }

  // 수직 그리드선 + x축 라벨
  months.forEach((month, index) => {
    const x = offsetX + index * pointGap;

    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", x);
    line.setAttribute("x2", x);
    line.setAttribute("y1", offsetY);
    line.setAttribute("y2", offsetY + chartHeight);
    line.setAttribute("stroke", "#f0f0f0");
    gridGroup.appendChild(line);

    const label = document.createElementNS(svgNS, "text");
    label.setAttribute("x", x);
    label.setAttribute("y", offsetY + chartHeight + 20);
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("font-size", "12");
    label.setAttribute("fill", "#666");
    label.textContent = month;
    gridGroup.appendChild(label);
  });
}

export function renderLineChart(container, totalAmountByMonth) {
  // 기존 svg 제거
  Array.from(container.querySelectorAll("svg")).forEach((el) => el.remove());

  const width = 840;
  const height = 452;
  const chartHeight = 400;
  const chartWidth = 700;
  const offsetX = 70;
  const offsetY = 26;

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  const values = Object.values(totalAmountByMonth).map(Math.abs);
  const months = Array.from({ length: 12 }, (_, i) => i);

  const minValue = 0;
  const maxValue = Math.max(...values);
  const range = Math.max(maxValue, 1);
  const pointGap = chartWidth / (months.length - 1);
  const scale = chartHeight / range;

  renderGrid(
    svgNS,
    svg,
    minValue,
    range,
    scale,
    offsetX,
    offsetY,
    chartWidth,
    chartHeight,
    months,
    pointGap
  );
  // path 데이터 생성
  let pathData = "";
  let hasData = false;
  const points = [];

  months.forEach((month, index) => {
    let value = totalAmountByMonth[month];
    if (value === undefined) return;
    value = Math.abs(value);

    const x = offsetX + index * pointGap;
    const y = offsetY + chartHeight - value * scale;

    if (!hasData) {
      pathData += `M ${x} ${y}`;
      hasData = true;
    } else {
      pathData += ` L ${x} ${y}`;
    }

    points.push({ x, y, value });
  });

  // 1. 선 그리기
  if (hasData) {
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", pathData);
    path.setAttribute("stroke", "#000");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("fill", "none");
    svg.appendChild(path);
  }

  // 2. 텍스트와 원 그리기
  points.forEach(({ x, y, value }) => {
    // 그룹 생성
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("class", "chart-point-group");

    // 금액 라벨 추가
    // 배경 텍스트
    const outline = document.createElementNS(svgNS, "text");
    outline.setAttribute("x", x);
    outline.setAttribute("y", y - 15);
    outline.setAttribute("text-anchor", "middle");
    outline.setAttribute("font-size", "12");
    outline.setAttribute("stroke", "#fff");
    outline.setAttribute("stroke-width", "3");
    outline.setAttribute("fill", "#fff");
    outline.setAttribute("class", "chart-label chart-label-outline");
    outline.textContent = `${formatMoney(value)}원`;

    // 앞에 올 글자 (실제 텍스트 색)
    const label = document.createElementNS(svgNS, "text");
    label.setAttribute("x", x);
    label.setAttribute("y", y - 15);
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("font-size", "12");
    label.setAttribute("fill", "#000");
    label.setAttribute("class", "chart-label chart-label-text");
    label.textContent = `${formatMoney(value)}원`;

    // 원 추가
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 4);
    circle.setAttribute("fill", "#000");
    circle.setAttribute("cursor", "pointer");
    circle.setAttribute("class", "chart-point");

    // 그룹에 요소들 추가
    group.appendChild(outline);
    group.appendChild(label);
    group.appendChild(circle);

    // 그룹을 svg에 추가
    svg.appendChild(group);
  });

  container.appendChild(svg);
}
