import { createElement } from "../utils/createElement.js";
import { dateStore } from "../store/dateStore.js";
import { DatesCard } from "./DatesCard.js";
import { deleteMonthData } from "../api/api.js";
export function CostList(year, month, item) {
    const whichDate = new Date(year, month - 1, item.date);
    const day = whichDate.getDay();
    const koreanDays = ["일", "월", "화", "수", "목", "금", "토"];
    const dayKorean = koreanDays[day];
    let totalIncome = 0;
    let totalExpense = 0;
    item.items.forEach((costItem) => {
        if (costItem.type === "income") {
            totalIncome += costItem.amount;
        } else if (costItem.type === "expense") {
            totalExpense += costItem.amount;
        }
    });
    const container = createElement("div", {
        className: "cost-list-item",
    });
    const stats = createElement("div", {
        className: "flex justify-between align-center serif-14",
        innerHTML: `
        <div>${month}월 ${item.date}일 ${dayKorean}요일</div>
        <div>
            ${
                totalIncome
                    ? `<span class="cost-list-total-income">수입 ${totalIncome.toLocaleString()}원</span>`
                    : ""
            }
    ${
        totalExpense
            ? `<span class="cost-list-total-expense">지출 ${totalExpense.toLocaleString()}원</span>`
            : ""
    }
        </div>
        `,
    });
    stats.style.marginBottom = "16px";
    container.appendChild(stats);
    const costItem = createElement("div", {
            className: "cost-item-list",
            
        });
    console.log(item.items);
    item.items.map((item) => {
        console.log(item);
        const datesCard = DatesCard(item, ()=>deleteMonthData({year: year, month: month, ...item}));

        costItem.appendChild(datesCard);
    });
    container.appendChild(costItem);
    return container;
}