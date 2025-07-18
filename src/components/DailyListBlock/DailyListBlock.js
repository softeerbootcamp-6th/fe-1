import TagBox from "../TagBox/TagBox.js";
import { formatAmount } from "../../utils/format.js";
import incomeExpenseStore from "../../store/incomeExpenseStore.js";
import MainPage from "../../pages/MainPage/MainPage.js";

function DailyListBlock({ data, onSelect }) {

    const handleDelete = () => {
        incomeExpenseStore.deleteDailyListBlock(data);
        MainPage().init();
    };

    return {
        element: `
            <div class="daily-list-block daily-list-block__content-row" id="${data.blockId}">
                ${TagBox({ value: data.category }).element}
                <span class="content-row__info">${data.description}</span>
                <span class="content-row__method">${data.method}</span>
                <span class="content-row__amount" style="color: ${data.amount < 0 ? '#C04646' : '#79B2CA'};">${formatAmount(data.amount)}원</span>

                <div class="delete-button" style="display: none;">
                    <button class="flex-row button" id="delete-button-${data.blockId}">
                        <img src="assets/icons/close-red.svg" alt="삭제 아이콘" class="mr-1">
                        <span style="color: #E93B5A;"> 삭제</span>
                    </button>
                </div>
            </div>
        `,
        init: () => {
            setTimeout(() => {
                const contentRow = document.getElementById(data.blockId);
                contentRow.addEventListener("click", () => {
                    if (onSelect) onSelect(data.blockId);
                });

                const deleteButton = document.getElementById(`delete-button-${data.blockId}`);
                if (deleteButton) {
                    deleteButton.addEventListener("click", () => {
                        handleDelete();
                    }, 0);
                }
            }, 0);
        }
    };
}
export default DailyListBlock;