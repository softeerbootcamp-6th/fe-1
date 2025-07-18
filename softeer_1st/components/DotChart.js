import { createElement } from "../utils/createElement.js";

export function DotChart({ category, max, min, items }) {
    const container = createElement("div", {
        className: "dot-chart-container",
    });
    const title = createElement("h2", {
        className: "dot-chart-title light-16",
        textContent: `${category} 카테고리의 지출 내역`,
    });
    container.appendChild(title);
    
    const chartContainer = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );
    chartContainer.classList.add("dot-chart-svg");
    const width = 750;
    const height = 320;
    const padding = 40;
    const points = [];
    const dotRadius = 4;
    const totalMonths = 12;

    const leftMargin = 20; // 왼쪽 여백
    const rightMargin = 20; // 오른쪽 여백
    const viewBoxWidth = width + leftMargin + rightMargin; // 전체 너비에 여백 추가
    
    chartContainer.setAttribute("width", width);
    chartContainer.setAttribute("height", height);
    chartContainer.setAttribute("viewBox", `-${leftMargin} 0 ${viewBoxWidth} ${height}`);
    chartContainer.setAttribute("class", "dot-chart");
    
    // X축 간격 계산 (1-12월을 균등하게 배치)
    const xStep = (width) / (totalMonths - 1);
    const chartHeight = height - padding * 2;
    const gridGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    gridGroup.setAttribute("class", "grid");
    //세로 격자선
    for(let i = 0; i < totalMonths * 2; i++) {
        const x = i * xStep / 2;
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x);
        line.setAttribute("y1", padding / 2 - 2);
        line.setAttribute("x2", x);
        line.setAttribute("y2", height - padding);
        line.setAttribute("stroke", "#e0e0e0");
        line.setAttribute("stroke-width", "1");
        gridGroup.appendChild(line);
    }
    //가로 격자선
    for(let i = 0; i <= totalMonths; i++) {
        const y = height - padding - (i * chartHeight) / (totalMonths-1);
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", 0);
        line.setAttribute("y1", y);
        line.setAttribute("x2", width - 0);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", "#e0e0e0");
        line.setAttribute("stroke-width", "1");
        gridGroup.appendChild(line);
    }
    chartContainer.appendChild(gridGroup);
    
    items.forEach((item, index) => {
        // 각 점의 X 좌표 (1월부터 시작)
        const x = index * xStep;
        
        // Y 좌표 계산 (min-max 범위에서 정규화)
        const y = height - padding - ((item - min) / (max - min)) * (height - padding * 2);
        
        points.push(`${x},${y}`);

        // 점 그리기
        const circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", dotRadius);
        circle.setAttribute("fill", "black");
        chartContainer.appendChild(circle);

        // 라벨 그리기
        const text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );
        text.setAttribute("x", x);
        text.setAttribute("y", y - 10);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("font-size", "12px");
        text.textContent = item.toLocaleString();
        chartContainer.appendChild(text);
    });
    
    // 선 그리기
    const polyline = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polyline"
    );
    polyline.setAttribute("points", points.join(" "));
    polyline.setAttribute("fill", "none");
    polyline.setAttribute("stroke", "black");
    polyline.setAttribute("stroke-width", "2");
    chartContainer.appendChild(polyline);

    // X축 라벨 (1-12월)
    for (let i = 0; i < totalMonths; i++) {
        const x = i * xStep;
        const label = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );
        label.setAttribute("x", x);
        label.setAttribute("y", height - 10);
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("font-size", "12px");
        
        // 데이터가 있는 달(1-7)은 검은색, 없는 달(8-12)은 회색
        if (i < items.length) {
            label.setAttribute("fill", "black");
        } else {
            label.setAttribute("fill", "#999999");
        }
        
        label.textContent = (i + 1).toString();
        chartContainer.appendChild(label);
    }
    
    container.appendChild(chartContainer);
    return container;
}