import {
    getMonthData,
    getExpenseByCategory,
    getExpenseByMonth,
    getRecentMonthCategoryData,
} from "../api/api.js";
import { createElement } from "../utils/createElement.js";
import { dateStore } from "../store/dateStore.js";
import { DonutChart } from "../components/DonutChart.js";
import { DotChart } from "../components/DotChart.js";
import { CostList } from "../components/CostList.js";

export function renderStats() {
    const [year, month] = [dateStore.year, dateStore.month];
    const section = createElement("section", {
        className: "stats-page",
        id: "stats-page",
    });
    const donutChartContainer = createElement("div", {
        id: "donut-chart-container",
    });
    const dotChartContainer = createElement("div", {
        id: "dot-chart-container",
    });
    const costListContainer = createElement("div", {
        id: "cost-list-container",
    });
    section.appendChild(donutChartContainer);
    section.appendChild(dotChartContainer);
    section.appendChild(costListContainer);
    renderDonutChart(year, month);
    window.addEventListener("date-change", async (e) => {
        const { year, month } = e.detail;
        donutChartContainer.innerHTML = "";
        dotChartContainer.innerHTML = "";
        costListContainer.innerHTML = "";
        renderDonutChart(year, month);
    });
    section.addEventListener('category-selected', async (e) => {
        dotChartContainer.innerHTML = "";
        costListContainer.innerHTML = "";
        const { category } = e.detail;
        const currentYear = dateStore.year;
        const currentMonth = dateStore.month;

        await renderDotChart(currentYear, currentMonth, category);
        await renderCostList(currentYear, currentMonth, category);
    })

    async function renderDonutChart(year, month) {
        const donutChartData = await getExpenseByMonth(year, month);
        const donutChart = DonutChart(donutChartData);
        donutChartContainer.appendChild(donutChart);
    }
    async function renderDotChart(year, month, category) {
        const dotChartData = await getExpenseByCategory(year, month, category);
        const dotChart = DotChart(dotChartData)
        dotChartContainer.appendChild(dotChart);
        
    }
    async function renderCostList(year, month, category) {
        const costListData = await getRecentMonthCategoryData(year, month, category);
        costListData.forEach((item) =>{
            const costList = CostList(year, month, item);
            costListContainer.appendChild(costList);
        })
    }
    //dotChart, CostList는 donutChart 내 각 카테고리 버튼을 클릭했을 때만 렌더. 거기서 이벤트를 쏘고, 여기서 받아와서 렌더링하기
    return section;
}
