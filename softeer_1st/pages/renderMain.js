import { Form } from "../components/Form.js";
import { CostList } from "../components/CostList.js";
import { createElement } from "../utils/createElement.js";
import { dateStore } from "../store/dateStore.js";
import { getMonthData } from "../api/api.js";
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
        console.log(e);
        const { year: newYear, month: newMonth } = e
            ? e.detail
            : { year, month };
        mainContainer.innerHTML = ""; // Clear previous content
        try {
            getMonthData(newYear, newMonth)
                .then((data) => {
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
                    return groupedArray;
                })
                .then((monthData) => {
                    const eachDateContainer = createElement("div", {
                        className: "each-date-container",
                    });

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
                    });

                    // 전체 내역
                    const totalText = createElement("div", {
                        className: "light-12",
                        textContent: `전체 내역 ${monthData.length}건`,
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
                            monthData,
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
                            monthData,
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
                    renderEachDateContainer(
                        monthData,
                        showCost,
                        eachDateContainer
                    );

                    function renderEachDateContainer(
                        monthData,
                        showCost,
                        eachDateContainer
                    ) {
                        eachDateContainer.innerHTML = ""; // 초기화

                        monthData.forEach((item) => {
                            const filteredItems = item.items.filter(
                                (costItem) => {
                                    if (
                                        showCost.income &&
                                        costItem.type === "income"
                                    )
                                        return true;
                                    if (
                                        showCost.expense &&
                                        costItem.type === "expense"
                                    )
                                        return true;
                                    return false;
                                }
                            );

                            if (filteredItems.length === 0) return;

                            const costListElement = CostList(
                                newYear,
                                newMonth,
                                {
                                    date: item.date,
                                    items: filteredItems,
                                }
                            );

                            eachDateContainer.appendChild(costListElement);
                        });
                    }
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

