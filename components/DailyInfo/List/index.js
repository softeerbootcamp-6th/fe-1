import createDetailList from '../DetailList/index.js';
import { formatDate, formatNumberWithCommas } from '../../../lib/utils.js';

/*
    [DATA TYPE]
    {
        date: '2025-07-11',
        records: [
            {
                category: 'food',
                description: '편의점 간식 구매',
                payment: 'KB국민카드',
                value: -4500,
                paidAt: '2025-07-11',
                createdAt: '2025-07-11',
            },
            ...
        ],
    },
*/

const createDailyList = (data) => {
    let expenseValue = 0;
    let incomeValue = 0;

    const getValue = () => {
        data.records.map(({ value }) => {
            value > 0
                ? (incomeValue += value)
                : (expenseValue += Math.abs(value));
        });
    };

    getValue();

    const dailyListItem = document.createElement('li');
    dailyListItem.className = 'daily-list';
    dailyListItem.innerHTML = `
            <div class="daily-info">
                <span class="serif-14">${formatDate(
                    data.date,
                    'M월 D일 ddd'
                )}</span>
                <div>
                    <span class="serif-14">수입</span>
                    <span class="serif-14">${formatNumberWithCommas(
                        incomeValue
                    )}원</span>
                    <span class="serif-14">지출</span>
                    <span class="serif-14">${formatNumberWithCommas(
                        expenseValue
                    )}원</span>
                </div>
            </div>
        `;
    const detailList = createDetailList({ records: data.records });
    dailyListItem.appendChild(detailList);

    return dailyListItem;
};

export default createDailyList;
