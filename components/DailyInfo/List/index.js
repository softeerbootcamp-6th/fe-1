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
                paymentMethod: 'KB국민카드',
                amount: -4500,
                paidAt: '2025-07-11',
                createdAt: '2025-07-11',
            },
            ...
        ],
    },
*/

const createDailyList = (data) => {
    let expense = 0;
    let income = 0;

    const getAmount = () => {
        data.records.map(({ amount }) => {
            amount > 0 ? (income += amount) : (expense += Math.abs(amount));
        });
    };

    getAmount();

    const dailyListItem = document.createElement('li');
    dailyListItem.className = 'daily-list';
    dailyListItem.innerHTML = `
            <div class="daily-info">
                <span class="serif-14">${formatDate(
                    new Date(data.date),
                    'M월 D일 ddd'
                )}</span>
                <div>
                    ${
                        income > 0
                            ? `
                                <span class="serif-14">수입</span>
                                <span class="serif-14">${formatNumberWithCommas(
                                    income
                                )}원</span>
                            `
                            : ''
                    }
                    ${
                        expense > 0
                            ? `
                                <span class="serif-14">지출</span>
                                <span class="serif-14">${formatNumberWithCommas(
                                    expense
                                )}원</span>
                            `
                            : ''
                    }
                </div>
            </div>
        `;
    const detailList = createDetailList({ records: data.records });
    dailyListItem.appendChild(detailList);

    return dailyListItem;
};

export default createDailyList;
