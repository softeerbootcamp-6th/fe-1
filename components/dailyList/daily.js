import { createElement } from '../../../utils.js';
import { formatAmount } from '../../utils.js';
const COLOR = {
    생활: '#A7B9E9',
    '문화/여가': '#BDA6E1',
    미분류: '#F0B0D3',
    교통: '#7DB7BF',
    식비: '#C5E0EB',
    '의료/건강': '#BCDFD3',
    용돈: '#AACD7E',
    '기타 수입': '#A28878',
    '쇼핑/뷰티': '#D7CA6B',
    월급: '#E39D5D',
};

export default function createDaily(dailyInfo) {
    const { category, description, payment, amount } = dailyInfo;

    const dailyInnerHtml = `
            <div class="category-info lt-14" style="background-color :${
                COLOR[category]
            }" >${category}</div>
            <div class="description-info lt-14">
                ${description}
            </div>
            <div class="payment-info lt-14">${payment}</div>
            <div class="amount-info ${
                amount > 0 ? 'text-blue' : 'text-red'
            } lt-14">${formatAmount(amount)}원</div>
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
