import { createElement } from "../utils/createElement.js";

export function DonutChart(data) {
    const backgrounds = {
        생활: "colorchip-90",
        "쇼핑/뷰티": "colorchip-30",
        "의료/건강": "colorchip-50",
        식비: "colorchip-60",
        교통: "colorchip-70",
        "문화/여가": "pastel-perfume",
        미분류: "pastel-lavenderCream",
        월급: "colorchip-20",
        용돈: "colorchip-40",
        "기타 수입": "colorchip-10",
    };
    const container = createElement("div", {
        className: "donut-chart-container",
    });

    console.log(data);
    
    return container;
}