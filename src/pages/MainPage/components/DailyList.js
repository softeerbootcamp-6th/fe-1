import DailyListBlock from "../../../components/DailyListBlock/DailyListBlock.js";

function DailyList({ dailyListArray }) {

    return {
        element: `
            <div class="daily-list">
                <div class="flex-row">
                    <div class="date-text">2023년 8월 1일</div>
                    <div class="inline-block">
                        <span>지출</span>
                        <span> 1,300원</span>
                    </div>
                </div>
                <div class="daily-list-content">
                    ${DailyListBlock().element}
                </div>
            </div>
        `
        ,
        init: () => {
            DailyListBlock().init();
        }
    };
}
export default DailyList;