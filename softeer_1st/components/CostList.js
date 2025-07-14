import { createElement } from "../utils/createElement.js";
import { dateStore } from "../store/dateStore.js";
import { DatesCard } from "./DatesCard.js";
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
        const datesCard = DatesCard(item, ()=>deleteCostItem({year: year, month: month, ...item}));

        costItem.appendChild(datesCard);
    });
    container.appendChild(costItem);
    return container;
}
function deleteCostItem(item){
    fetch(`http://localhost:3000/api/data`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to delete cost item");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Cost item deleted successfully:", data);
            // 데이터 삭제 후 필요한 작업 수행 (예: UI 업데이트)
            dateStore.updateDateState();
        })
        .catch((error) => {
            console.error("Error deleting cost item:", error);
            // 에러 처리 로직 추가 (예: 사용자에게 알림)
        }
    );
}