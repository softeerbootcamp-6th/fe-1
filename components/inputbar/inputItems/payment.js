import { createElement } from '../../../utils.js';
import formData from '../../../store/formData.js';

export default function createPaymentInput() {
    const paymentInputInnerHtml = `
            <label for="paymentInput" class="lt-12">결제수단</label>
            <select id="paymentInput" class="sb-12">
                <option>dfasdf</option>
                <option>df123f</option>
                <option>df222f</option>
            </select>
        `;

    const $paymentInputItem = createElement(
        'div',
        {
            class: 'payment-wrapper',
        },
        paymentInputInnerHtml,
    );

    const $paymentInput = $paymentInputItem.querySelector('#paymentInput');
    $paymentInput.addEventListener('change', (e) => {
        formData.setPayment(e.target.value);
    });

    return $paymentInputItem;
}
