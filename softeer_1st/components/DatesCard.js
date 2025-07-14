import { createElement } from "../utils/createElement.js";
import { openModal } from "./Modal.js";

export function DatesCard(
    { amount, category, date, description, paymentMethod, type },
    deleteCostItem
) {
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
    const card = createElement("div", {
        className: "dates-card",
        innerHTML: `
                <div class='${backgrounds[category]} light-12'>${category}</div>
                <div class="light-14">${description}</div>
                <div class="light-14">${paymentMethod}</div>
                <div id="delete-button" class="flex justify-end light-14 ${
                    type === "expense" ? "expense" : "income"
                }">${
            type === "expense" ? "-" : ""
        }${amount.toLocaleString()}원</div>
                `,
    });

    const deletePosition = card.querySelector("#delete-button");
    const deleteButton = createElement("button", {
        className: "delete-button flex align-center gap-4 ml-16",
        innerHTML: `<img src="../assets/icons/delete-btn.svg" alt="삭제"><div class="semibold-12" style="color:var(--danger-text-default)">삭제</div>`,
    });
    deleteButton.addEventListener("click", async () => {
        const isConfirmed = await confirmModal({
            type,
            category,
            description,
            paymentMethod,
            amount,
        });
        if (isConfirmed) {
            deleteCostItem();
            alert("내역이 삭제되었습니다.");
            location.reload();
        }
    });
    card.addEventListener("mouseenter", () => {
        deletePosition.appendChild(deleteButton);
    });
    card.addEventListener("mouseleave", () => {
        deletePosition.removeChild(deleteButton);
    });
    return card;
}

const confirmModal = (message) => {
    return new Promise((resolve, reject) => {
        openModal({
            title: "해당 내역을 삭제하시겠습니까?",
            content: `<ul>
            <li class="light-12">카테고리:(${message.type}) ${
                message.category
            }</li>
            <li class="light-12">내용: ${message.description}</li>
            <li class="light-12">결제수단: ${message.paymentMethod}</li>
            <li class="light-12">금액: ${message.amount.toLocaleString()}원</li>
            </ul>`,
            isDelete: true,
            onClick: () => {
                resolve(true);
            },
        });
    });
};
