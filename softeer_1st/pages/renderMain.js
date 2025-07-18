import { Form } from "../components/Form.js";
import { CostList } from "../components/CostList.js";
import { createElement } from "../utils/createElement.js";
import { dateStore } from "../store/dateStore.js";
import { getMonthData } from "../api/api.js";
import { eventBus } from "../utils/eventBus.js";

export function renderMain() {
    let [year, month] = [dateStore.year, dateStore.month];
    let showCost = {
        income: true,
        expense: true,
    };
    const section = document.createElement("section");
    const form = Form();
    const mainContainer = createElement("div", {
        className: "main-container",
    });

    const updateDateState = (e) => {
        let newYear, newMonth;
        if (e && e.detail) {
            newYear = e.detail.year;
            newMonth = e.detail.month;
        } else {
            newYear = dateStore.year;
            newMonth = dateStore.month;
        }
        mainContainer.innerHTML = ""; // Clear previous content

        try {
            renderCostData(newYear, newMonth, showCost);
        } catch (error) {
            console.error("Error rendering cost data:", error);
        }
    };

    // 데이터 업데이트 이벤트 리스너 추가
    const handleDataUpdate = (data) => {
        console.log("Data updated:", data);
        // 현재 보고 있는 년월과 업데이트된 년월이 같으면 리렌더링
        if (data.year === dateStore.year && data.month === dateStore.month) {
            updateDateState();
        }
    };

    // 이벤트 리스너 등록
    eventBus.on("data-updated", handleDataUpdate);

    // 데이터 렌더링 함수
    async function renderCostData(newYear, newMonth, showCost) {
        try {
            const data = await getMonthData(newYear, newMonth);
            const grouped = {};
            data.forEach((item) => {
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

            const eachDateContainer = createElement("div", {
                className: "each-date-container",
            });

            let totalIncome = 0;
            let totalExpense = 0;
            groupedArray.forEach((item) => {
                item.items.forEach((costItem) => {
                    if (costItem.type === "income") {
                        totalIncome += costItem.amount;
                    } else if (costItem.type === "expense") {
                        totalExpense += costItem.amount;
                    }
                });
            });

            const stat = createElement("div", {
                className: "flex justify-between align-center cost-list-stat",
            });

            // 전체 내역
            const totalText = createElement("div", {
                className: "light-12",
                textContent: `전체 내역 ${groupedArray.length}건`,
            });

            // 수입 컨테이너
            const incomeContainer = createElement("span", {
                className: "flex gap-4 align-center",
            });

            const incomeButton = createElement("button", {
                id: "show-income-check",
                className: "flex justify-center align-center",
            });

            const incomeImg = createElement("img", {
                src: `../assets/icons/${
                    showCost.income ? "checkbox" : "uncheckbox"
                }.svg`,
                style: { width: "16px", height: "16px" },
            });

            incomeButton.appendChild(incomeImg);
            const incomeText = document.createTextNode(
                `수입 ${totalIncome.toLocaleString()}`
            );

            // 지출 컨테이너
            const expenseContainer = createElement("span", {
                className: "flex gap-4 align-center",
            });

            const expenseButton = createElement("button", {
                id: "show-expense-check",
                className: "flex justify-center align-center",
            });

            const expenseImg = createElement("img", {
                src: `../assets/icons/${
                    showCost.expense ? "checkbox" : "uncheckbox"
                }.svg`,
                style: { width: "16px", height: "16px" },
            });

            expenseButton.appendChild(expenseImg);
            const expenseText = document.createTextNode(
                `지출 ${totalExpense.toLocaleString()}`
            );

            // 수입, 지출 span 조립
            incomeContainer.appendChild(incomeButton);
            incomeContainer.appendChild(incomeText);

            expenseContainer.appendChild(expenseButton);
            expenseContainer.appendChild(expenseText);

            incomeButton.addEventListener("click", () => {
                showCost.income = !showCost.income;
                incomeImg.src = `../assets/icons/${
                    showCost.income ? "checkbox" : "uncheckbox"
                }.svg`;
                renderEachDateContainer(
                    groupedArray,
                    showCost,
                    eachDateContainer
                );
            });

            expenseButton.addEventListener("click", () => {
                showCost.expense = !showCost.expense;
                expenseImg.src = `../assets/icons/${
                    showCost.expense ? "checkbox" : "uncheckbox"
                }.svg`;
                renderEachDateContainer(
                    groupedArray,
                    showCost,
                    eachDateContainer
                );
            });

            // 오른쪽 영역 (수입+지출 묶기)
            const rightSide = createElement("div", {
                className: "flex gap-8 light-12 align-center",
            });

            rightSide.appendChild(incomeContainer);
            rightSide.appendChild(expenseContainer);

            // stat 최종 조립
            stat.appendChild(totalText);
            stat.appendChild(rightSide);

            mainContainer.appendChild(stat);
            mainContainer.appendChild(eachDateContainer);
            renderEachDateContainer(groupedArray, showCost, eachDateContainer);

            function renderEachDateContainer(
                monthData,
                showCost,
                eachDateContainer
            ) {
                eachDateContainer.innerHTML = ""; // 초기화

                monthData.forEach((item) => {
                    const filteredItems = item.items.filter((costItem) => {
                        if (showCost.income && costItem.type === "income")
                            return true;
                        if (showCost.expense && costItem.type === "expense")
                            return true;
                        return false;
                    });

                    if (filteredItems.length === 0) return;

                    const costListElement = CostList(newYear, newMonth, {
                        date: item.date,
                        items: filteredItems,
                    });

                    eachDateContainer.appendChild(costListElement);
                });
            }
        } catch (err) {
            console.error("Error fetching month data:", err);
            mainContainer.innerHTML = `<div class="error-message">데이터를 불러오는데 실패했습니다.</div>`;
        }
    }

    window.addEventListener("date-change", updateDateState);
    updateDateState();
    section.appendChild(form);
    section.appendChild(mainContainer);

    return section;
}
