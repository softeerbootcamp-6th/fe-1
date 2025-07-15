import { getMonthData } from "../api/api.js";
import { createElement } from "../utils/createElement.js";
import { dateStore } from "../store/dateStore.js";
import { DonutChart } from "../components/DonutChart.js";

export function renderStats() {
    const [year, month] = [dateStore.year, dateStore.month];
    const section = createElement("section", {
        className: "stats-page",
        id: "stats-page",
    });
    const donutGraphContainer = createElement("div", {
        className: "donut-graph-container",
    });
    const dotGraphContainer = createElement("div", {
        className: "dot-graph-container",
    });
    const costListContainer = createElement("div", {
        className: "cost-list-container",
    });
    section.appendChild(donutGraphContainer);
    section.appendChild(dotGraphContainer);
    section.appendChild(costListContainer);
    renderDonutGraph(year, month);
    window.addEventListener("date-change", async (e) => {
        const { year, month } = e.detail;
        donutGraphContainer.innerHTML = "";
        dotGraphContainer.innerHTML = "";
        costListContainer.innerHTML = "";
        renderDonutGraph(year, month);
    });

    async function renderDonutGraph(year, month) {
        const donutGraphData = await refineData(year, month);
        const donutGraph = DonutChart(donutGraphData);
        donutGraphContainer.appendChild(donutGraph);
    }
    async function refineData(year, month) {
        const monthData = await getMonthData(year, month);
        
        const categoryData = {}
        let total = 0;
        monthData.forEach((item) => {
            if (item.type === "expense") {
                total += item.amount;
                categoryData[item.category] = (categoryData[item.category] || 0) + item.amount;
            }
        });
        const sortedCategories = Object.entries(categoryData)
            .sort((a, b) => b[1] - a[1])
            .map(([category, amount]) => ({ category, amount }));
        return {
            data: sortedCategories,
            total: total,
        };
    }
    //dotGraph, CostList는 donutGraph 내 각 카테고리 버튼을 클릭했을 때만 렌더. 거기서 이벤트를 쏘고, 여기서 받아와서 렌더링하기
    return section;
}
