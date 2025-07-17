export function renderLineChart(container, totalAmountByMonth) {
  // 기존 svg 제거
  Array.from(container.querySelectorAll("svg")).forEach((el) => el.remove());

  const width = 840;
  const height = 452;
  const chartHeight = 350;
  const chartWidth = 700;
  const offsetX = 70;
  const offsetY = 26;

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  const values = Object.values(totalAmountByMonth);
  const months = Object.keys(totalAmountByMonth);

  const minValue = Math.min(...values);
  const maxValue = 0;
  const range = maxValue - minValue || 1;
  const pointGap = chartWidth / (months.length - 1);
  const scale = chartHeight / range;

  // path와 point 생성
  let pathData = "";

  months.forEach((month, index) => {
    const value = totalAmountByMonth[month]; // 음수 값
    const x = offsetX + index * pointGap;
    const y = offsetY + (maxValue - value) * scale; // 값이 작을수록 더 위로

    if (index === 0) {
      pathData += `M ${x} ${y}`;
    } else {
      pathData += ` L ${x} ${y}`;
    }

    // 원 추가
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 4);
    circle.setAttribute("fill", "#000");
    svg.appendChild(circle);
  });

  // 선 추가
  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("d", pathData);
  path.setAttribute("stroke", "#000");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("fill", "none");
  svg.appendChild(path);

  container.appendChild(svg);
}
