import formData from '../../../store/formData.js';
import { createElement } from '../../../utils.js';
import payment from '../../../store/payment.js';

function createPaymentOptionList(items) {
    return `
        ${items
            .map(
                (item) => `<li id="payment-line" data-value="${item}">
                        <span class="lt-12">${item}</span>
                        <button>
                            <img src="/public/red-closed.svg" />
                        </button>
                    </li>`,
            )
            .join('')}
            <li id="payment-line">
                <button>
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

    $paymentOptionItem.addEventListener('click', (e) => {
        const $targetLine = e.target.closest('#payment-line');
        const selectedPayment = $targetLine.getAttribute('data-value');

        const $dropdownList = document.getElementById('dropdown-List-payment');
        const $background = $dropdownList.nextElementSibling;

        $dropdownList.remove();
        $background.remove();

        document.getElementById('dropdown-toggle-payment').textContent =
            selectedPayment;
        formData.setPayment(selectedPayment);
    });

    return $paymentOptionItem;
}
