import { createElement } from '../../../utils.js';

export default function createDaily(dailyInfo) {
    const { category, description, payment, amount } = dailyInfo;

    const dailyInnerHtml = `
            <div class="category-info lt-14">${category}</div>
            <div class="description-info lt-14">
                ${description}
            </div>
            <div class="payment-info lt-14">${payment}</div>
            <div class="amount-info lt-14">${amount}</div>
        `;

    const $dailyInfo = createElement(
        'li',
        {
            class: 'daily-line',
        },
        dailyInnerHtml,
    );

    return $dailyInfo;
}
