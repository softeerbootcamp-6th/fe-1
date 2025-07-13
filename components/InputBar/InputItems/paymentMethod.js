import { createDropdownOptions } from '../../DropdownOption/index.js';
import { toggle } from '../../../lib/utils.js';

const paymentMethodOptions = [
    { value: 'card', label: '카드' },
    { value: 'cash', label: '현금' },
    { value: 'transfer', label: '계좌이체' },
    { value: 'mobile', label: '모바일페이' },
];

const createPaymentMethod = () => {
    const paymentMethodItem = document.createElement('div');
    paymentMethodItem.className = 'input-bar-item';
    paymentMethodItem.innerHTML = `
        <div class="input-bar-item-wrapper">
            <label for="payment-method" class="light-12">
                결제수단
            </label>
        </div>
        <div class="input-bar-item-wrapper select-container">
            <input type="hidden" name="paymentMethod" id="payment-method" value="" />
            <div class="select-label semibold-12">
                선택하세요
            </div>
            <img
                src="/assets/icons/chevron-down.svg"
                alt="Chevron Down Icon"
                width="16"
                height="16"
            />
        </div>
    `;

    const selectContainer =
        paymentMethodItem.querySelector('.select-container');
    const selectLabel = paymentMethodItem.querySelector('.select-label');
    const hiddenInput = paymentMethodItem.querySelector(
        'input[name="paymentMethod"]'
    );

    const dropdownOptions = createDropdownOptions(
        paymentMethodOptions,
        (value, label) => {
            selectLabel.textContent = label;
            hiddenInput.value = value;
            hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
    );

    paymentMethodItem.appendChild(dropdownOptions);

    selectContainer.addEventListener('click', () => {
        toggle(dropdownOptions);
    });

    return paymentMethodItem;
};

export default createPaymentMethod;
