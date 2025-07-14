import DailyListBlock from "../../../components/DailyListBlock/DailyListBlock.js";

function DailyList({ data }) {
    const list = data.list;

    return {
        element: `
            <div class="daily-list">
                <div class="flex-row">
                    <div class="date-text">${data.date}</div>
                    <div class="inline-block">
                        ${data.totalIncome !== 0 ? `<span class="mr-1">수입</span><span>${data.totalIncome}원</span>` : ''}
                        ${data.totalExpenses !== 0 ? `<span class="mr-1">지출</span><span>${data.totalExpenses}원</span>` : ''}
                    </div>
                </div>
                <div class="daily-list-content">
                    ${list.map(item => {
            const dailyListBlock = DailyListBlock({ data: item });
            return dailyListBlock.element;
        }).join('')}
                </div>
            </div>
        `
        ,
        init: () => {
            list.forEach(item => {
                const dailyListBlock = DailyListBlock({ data: item });
                if (dailyListBlock.init) {
                    dailyListBlock.init();
                }
            });

        }
    };
}
export default DailyList;