import { createElement } from '../../../utils.js';
import createPayemntInputOption from './paymentOption.js';

export default function createPaymentInput() {
    const paymentInputInnerHtml = `
            <div class="dropdown-payment">
                <span class="dropdown-main-payment">
                    <label for="paymentInput" class="dropdown-label lt-12">분류</label>
                    <span class="select-btn">
                        <span id="dropdown-toggle-payment" class="dropdown-btn sb-12">
                            선택하세요
                        </span>
                        <img width="32" height="16" src="/public/chevron-down.svg"/>
                    </span>
                </span>
            </div>
        `;

    const $paymentInputItem = createElement(
        'div',
        {
            class: 'payment-wrapper',
        },
        paymentInputInnerHtml,
    );

    $paymentInputItem
        .querySelector('.dropdown-main-payment')
        .addEventListener('click', () => {
            const $dropdown =
                $paymentInputItem.querySelector('.dropdown-payment');
            $dropdown.appendChild(createPayemntInputOption());

            const $backgroud = createElement(
                'div',
                { class: 'select-background' },
                '',
            );

            $dropdown.appendChild($backgroud);

            $backgroud.addEventListener('click', (e) => {
                e.stopPropagation();
                $dropdown.querySelector('#dropdown-List-payment').remove();
                $backgroud.remove();
            });
        });

    return $paymentInputItem;
}
