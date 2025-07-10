import { createElement } from '../../../utils.js';

export default function () {
    const paymentInputInnerHtml = `
            <label for="paymentInput" class="lt-12">결제수단</label>
            <select id="paymentInput" class="sb-12">
                <option>dfasdf</option>
            </select>
        `;

    const $paymentInputItem = createElement(
        'div',
        {
            class: 'payment-wrapper',
        },
        paymentInputInnerHtml,
    );

    return $paymentInputItem;
}
