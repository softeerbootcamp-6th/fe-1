import TagBox from "../TagBox/TagBox.js";
import { formatAmount } from "../../utils/format.js";

function DailyListBlock({ data }) {
    const handleBlockClick = () => {
        const blocks = document.querySelectorAll('.daily-list-block');
        blocks.forEach(block => {
            block.addEventListener('click', () => {
            });
        });
    }

    handleBlockClick();

    return {
        element: `
            <div class="daily-list-block daily-list-block__content-row">
                ${TagBox({ value: data.category }).element}
                <span class="content-row__info">${data.description}</span>
                <span class="content-row__method">${data.method}</span>
                <span class="content-row__amount">${formatAmount(data.amount)}원</span>
            </div>
        `
        ,
        init: () => {
            // console.log('블록 파라미터:', data);
        }
    };

};

export default DailyListBlock;