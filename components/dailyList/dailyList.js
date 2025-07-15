import { createElement, formatDateToKorean } from '../../utils.js';
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

    dailyInfo.items.forEach((info) => {
        $dailyListWrapper.appendChild(createDaily(info));
        if (info.amount > 0) {
            totalIncome += info.amount;
        } else {
            totalExpense -= info.amount;
        }
    });

    let amountHtml = '';
    amountHtml += totalIncome != 0 ? `<div>수입 ${totalIncome}</div>` : '';
    amountHtml += totalExpense != 0 ? `<div>지출 ${totalExpense}</div>` : '';

    const $dailyAmount = createElement(
        'div',
        { class: 'amount-wrapper' },
        amountHtml,
    );

    $dailyListContainer.querySelector('.date-info').after($dailyAmount);

    return $dailyListContainer;
}
