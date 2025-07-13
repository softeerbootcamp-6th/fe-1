import TagBox from "../TagBox/TagBox.js";

function handleBlockClick() {
    const blocks = document.querySelectorAll('.daily-list-block');
    blocks.forEach(block => {
        block.addEventListener('click', () => {
            console.log('DailyListBlock clicked');
        });
    });
}

function DailyListBlock() {
    return {
        element: `
            <div class="daily-list-block">
                ${TagBox({ value: '식비' }).element}
                <span class="daily-list-block-content inline-block">점심</span>
                <span class="daily-list-block-payment inline-block">카드</span>
                <span class="daily-list-block-price inline-block">1,300원</span>
            </div>
        `,
        init: handleBlockClick
    };
}

export default DailyListBlock;