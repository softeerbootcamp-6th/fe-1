import { createDropdownOptions } from '../../DropdownOption/index.js';
import { toggle } from '../../../lib/utils.js';
import createModal from '../../Modal/index.js';

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
            selectLabel.style.color = 'var(--neutral-text-default)';
            hiddenInput.value = value;
            hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
        },
        true
    );

    paymentMethodItem.appendChild(dropdownOptions);

    const addPaymentMethodButton = document.createElement('button');
    addPaymentMethodButton.className = 'add-payment-method-button';
    addPaymentMethodButton.innerHTML = `
        <span class="light-12">추가하기</span>
    `;
    dropdownOptions.appendChild(addPaymentMethodButton);

    selectContainer.addEventListener('click', () => {
        toggle(dropdownOptions);
    });

    const modal = createModal({
        okText: '추가',
        onOk: () => {
            const input = modal.querySelector('.input-payment-method');
            paymentMethodOptions.push({
                value: input.value,
                label: input.value,
            });

            input.value = '';
        },
        content: `
            <span class="light-16">추가하실 결제 수단을 입력해주세요.</span>
            <input
                class="semibold-12 input-payment-method"
                type="text"
                placeholder="입력하세요"
            />
        `,
    });

    addPaymentMethodButton.addEventListener('click', () => {
        modal.open();
    });

    return paymentMethodItem;
};

export default createPaymentMethod;
