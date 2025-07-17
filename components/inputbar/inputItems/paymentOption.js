import formData from '../../../store/formData.js';
import { createElement } from '../../../utils.js';
import payment from '../../../store/payment.js';

function createPaymentOptionList(items) {
    return `
        ${items
            .map(
                (item) => `<li id="payment-line" data-value="${item}">
                        <span id="payment-value" class="lt-12">${item}</span>
                        <button id="payment-delete-btn">
                            <img src="/public/red-closed.svg" />
                        </button>
                    </li>`,
            )
            .join('')}
            <li id="payment-line">
                <button id="payment-add-button">
                    <span class="lt-12" >추가하기</span>
                </button>
            </li>
            `;
}

export default function createPayemntInputOption() {
    const $paymentOptionItemInnerHtml = createPaymentOptionList(payment.data);

    const $paymentOptionItem = createElement(
        'ul',
        {
            id: 'dropdown-List-payment',
            class: 'dropdown-list-payment',
        },
        $paymentOptionItemInnerHtml,
    );

    $paymentOptionItem
        .querySelector('#payment-add-button')
        .addEventListener('click', (e) => {
            payment.addPayment('add');
        });

    $paymentOptionItem.addEventListener('click', (e) => {
        const $targetLine = e.target.closest('#payment-line');
        const $deleteBtn = e.target.closest('#payment-delete-btn');

        if ($deleteBtn) {
            const nowPayment = payment.filterByValue(
                $targetLine.querySelector('#payment-value').textContent,
            );
            $paymentOptionItem.innerHTML = createPaymentOptionList(nowPayment);
            e.stopPropagation();
            return;
        }

        const selectedPayment = $targetLine.getAttribute('data-value');

        const $dropdownList = document.getElementById('dropdown-List-payment');
        const $background = $dropdownList.nextElementSibling;

        $dropdownList.remove();
        $background.remove();
        if (!selectedPayment) return;
        document.getElementById('dropdown-toggle-payment').textContent =
            selectedPayment;
        formData.setPayment(selectedPayment);
    });

    return $paymentOptionItem;
}
