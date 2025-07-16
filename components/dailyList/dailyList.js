import { dailyData } from '../../store/daily.js';
import {
    createElement,
    formatAmount,
    formatDateToKorean,
} from '../../utils.js';
import createDaily from './daily.js';

export default function createDaliyList(dailyInfo) {
    const { date } = dailyInfo;
    const dateToKorean = formatDateToKorean(date);

    const dailyListContainerInnerHtml = `
        <div class="daily-header">
            <div class="date-info">${dateToKorean}</div>
        </div>
        <ol class="daliy-line-wrapper"></ol>
    `;

    const $dailyListContainer = createElement(
        'li',
        {
            class: 'day-container',
        },
        dailyListContainerInnerHtml,
    );

    const $dailyListWrapper = $dailyListContainer.querySelector(
        '.daliy-line-wrapper',
    );

    let totalIncome = 0;
    let totalExpense = 0;

    let totalcnt = 0;

    dailyInfo.items.forEach((info) => {
        if (
            (!dailyData.filteredIncome && info.amount > 0) ||
            (!dailyData.filteredExpense && info.amount < 0)
        ) {
            totalcnt++;
            if (info.amount > 0) {
                totalIncome += info.amount;
                dailyData.totalIncome += info.amount;
            } else {
                totalExpense -= info.amount;
                dailyData.totalExpense -= info.amount;
            }
            $dailyListWrapper.appendChild(createDaily(info));
        }
    });

    let amountHtml = '';
    amountHtml +=
        totalIncome != 0
            ? `<div>수입 ${formatAmount(totalIncome)}원</div>`
            : '';
    amountHtml +=
        totalExpense != 0
            ? `<div class="amount-line">지출 ${formatAmount(
                  totalExpense,
              )}원</div>`
            : '';

    const $dailyAmount = createElement(
        'div',
        { class: 'amount-wrapper' },
        amountHtml,
    );

    $dailyListContainer.querySelector('.date-info').after($dailyAmount);

    if (totalcnt == 0) return null;
    return $dailyListContainer;
}
