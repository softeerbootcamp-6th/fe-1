import { createElement } from "../utils/createElement.js";

export function DonutChart({ data, total }) {
    const backgrounds = {
        생활: "#A7B9E9",
        "쇼핑/뷰티": "#D7CA6B",
        "의료/건강": "#BCDFD3",
        식비: "#C5E0EB",
        교통: "#7DB7BF",
        "문화/여가": "#BDA6E1",
        미분류: "#F0B0D3",
        월급: "#E39D5D",
        용돈: "#AACD7E",
        "기타 수입": "#A28878",
    };

    const container = createElement("div", {
        className: "donut-chart-container",
    });

    // SVG 크기 지정
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "300");
    svg.setAttribute("height", "300");

    const radius = 100;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;

    // 가운데 흰색 원 (도넛 홀)
    const hole = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
    );
    hole.setAttribute("cx", 150);
    hole.setAttribute("cy", 150);
    hole.setAttribute("r", 60);
    hole.setAttribute("fill", "white");
    svg.appendChild(hole);

    data.forEach((item) => {
        const percentage = item.amount / total;
        const length = percentage * circumference;

        const circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );
        circle.setAttribute("cx", 150);
        circle.setAttribute("cy", 150);
        circle.setAttribute("r", radius.toString());
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", backgrounds[item.category]);
        circle.setAttribute("stroke-width", "40");
        circle.setAttribute(
            "stroke-dasharray",
            `${length} ${circumference - length}`
        );
        circle.setAttribute("stroke-dashoffset", (-offset).toString());
        circle.setAttribute("transform", "rotate(-90 150 150)");

        offset += length;
        svg.appendChild(circle);
    });

    container.appendChild(svg);
    const legend = createElement("div", {
        className: "donut-legend",
    });
    const legendTotal = createElement("p", {
        className: "serif-14 flex justify-between",
        innerHTML: `<div>이번 달 지출 금액</div><div>${total.toLocaleString()}원</div>`,
    });
    const legendCategories = createElement("div", {
        className: "donut-legend-categories",
    });
    data.forEach((item) => {
        const legendItem = createElement("div", {
            className: "donut-legend-item flex align-center",
            innerHTML: `
                <div class="colorchip" id="donut-legend-title" style="background-color: ${
                    backgrounds[item.category]
                }">${item.category}</div>
                <div class="donut-legend-wrapper">
                <div class="light-14" id="donut-legend-percentage">${Math.round(
                    (item.amount / total) * 100
                )}%</div>
                <div class="light-14" id="donut-legend-total-amount">${item.amount.toLocaleString()}원</div>
                </div>
                
            `,
        });
        legendItem.setAttribute("data-category", item.category);
        legendCategories.appendChild(legendItem);
    });
    legendCategories.addEventListener("click", (e) => {
        const clickedCategory = e.target.closest(".donut-legend-item");
        if (!clickedCategory) return;
        const category = clickedCategory.getAttribute("data-category");
        legendCategories
            .querySelectorAll(".donut-legend-item")
            .forEach((item) => {
                if (item.getAttribute("data-category") === category) {
                    item.classList.toggle("active");
                } else {
                    item.classList.remove("active");
                }
            });
        const event = new CustomEvent("category-selected", {
            detail: { category },
            bubbles: true,
        });
        legendCategories.dispatchEvent(event);
    });
    legend.appendChild(legendTotal);
    legend.appendChild(legendCategories);
    container.appendChild(legend);
    return container;
}
