import { createElement } from "../utils/createElement.js";

export function CalenderDate({date, items, isToday}){
    const container = createElement("div", {
        className: `calender-cell ${isToday ? "today" : ""}`,
    });

    const dateElement = createElement("div", {
        className: `calender-date serif-14`,
        textContent: date,
    });
    container.appendChild(dateElement);

    if (items.length > 0) {
        let total = 0
        items.forEach((item) => {
            const itemElement = createElement("div", {
                className: `calender-item light-14 ${item.type === "income" ? "income" : "expense"}`,
                textContent: (item.type === "income" ? "" : "-") + item.amount.toLocaleString(),
            });
            item.type === "income" ? total += item.amount : total -= item.amount;
            container.appendChild(itemElement);
        });
        const totalElement = createElement("div", {
            className: `calender-total light-14`,
            textContent: `${total.toLocaleString()}`,
        });
        container.appendChild(totalElement);
    }

    return container;
}