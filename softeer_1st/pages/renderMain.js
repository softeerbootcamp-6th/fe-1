import { Form } from "../components/Form.js";
import { CostList } from "../components/CostList.js";
import { createElement } from "../utils/createElement.js";
import { dateStore } from "../store/dateStore.js";
export function renderMain() {
    let [year, month] = [dateStore.year, dateStore.month];
    const section = document.createElement("section");
    const form = Form();
    const mainContainer = createElement("div", {
        className: "main-container",
    });
    const updateDateState = (e) => {
        console.log(e);
        const { year: newYear, month: newMonth } = e
            ? e.detail
            : { year, month };
        mainContainer.innerHTML = ""; // Clear previous content
        try {
            fetchCostList(newYear, newMonth)
                .then((monthData) => {
                    const eachDateContainer = createElement("div", {
                        className: "each-date-container",
                    });
                    mainContainer.appendChild(eachDateContainer);
                    let totalIncome = 0;
                    let totalExpense = 0;
                    monthData.forEach((item) => {
                        item.items.forEach((costItem) => {
                            if (costItem.type === "income") {
                                totalIncome += costItem.amount;
                            } else if (costItem.type === "expense") {
                                totalExpense += costItem.amount;
                            }
                        });
                    });
                    const stat = createElement("div", {
                        className:
                            "flex justify-between align-center cost-list-stat",
                        innerHTML: `
                                    <div class="light-12">전체 내역 ${monthData.length}건</div>
                                    <div class="flex gap-8 light-12 align-center">
                                        <span class="flex gap-4 align-center"><img style="width:16px;height:16px;" src="../assets/icons/checkbox.svg" />수입 ${totalIncome.toLocaleString()}</span>
                                        <span class="flex gap-4 align-center"><img style="width:16px;height:16px;" src="../assets/icons/checkbox.svg" />지출 ${totalExpense.toLocaleString()}</span>
                                `,
                    });

                    eachDateContainer.appendChild(stat);
                    monthData.map((item) => {
                        const costItem = createElement("div", {
                            className: "cost-item",
                        });

                        eachDateContainer.appendChild(
                            CostList(newYear, newMonth, item)
                        );
                        mainContainer.appendChild(eachDateContainer);
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        } catch (error) {
            container.innerHTML = `<div class="error-message">${error.message}</div>`;
        }
    };
    window.addEventListener("date-change", updateDateState);
    updateDateState();
    section.appendChild(form);
    section.appendChild(mainContainer);

    return section;
}

async function fetchCostList(year, month) {
    const response = fetch("http://localhost:3000/api/data", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) =>{
        if (!res.ok) {
            throw new Error("데이터 불러오기 실패");
        }
        return res.json();
    }).then((data) =>{
        const yearData = data.find((item) => item.year === year);
        if (!yearData) {
            throw new Error("해당 연도의 데이터가 없습니다.");
        }
        const monthData = yearData.months.find((item) => item.month === month);
        if (!monthData) {
            throw new Error("해당 월의 데이터가 없습니다.");
        }
        const grouped = {};
        monthData.list.forEach((item) => {
            const dateKey = `${item.date}`;
            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }
            grouped[dateKey].push(item);
        });
        const groupedArray = Object.keys(grouped).map((date) => ({
            date: Number(date),
            items: grouped[date],
        }));
        return groupedArray;
    }).catch((error) => {
        console.error("Error fetching cost list:", error);
        throw error;
    });
    return response;
}
