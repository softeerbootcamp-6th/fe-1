import { createDropdownOptions } from '../../DropdownOption/index.js';
import { toggle } from '../../../lib/utils.js';
import createModal from '../../Modal/index.js';
import formStore from '../../../store/form.js';

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
        formStore.paymentMethodOptions,
        (value, label) => {
            selectLabel.textContent = label;
            selectLabel.style.color = 'var(--neutral-text-default)';
            hiddenInput.value = value;
            hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
        },
        true
    );

    paymentMethodItem.appendChild(dropdownOptions);

    document.addEventListener('paymentMethodOptionsAdded', (event) => {
        dropdownOptions.createNewOption(event.detail.newPaymentMethod);
    });

    selectContainer.addEventListener('click', () => {
        toggle(dropdownOptions);
    });

    //
    //  결제 수단 추가 버튼
    //

    const addPaymentMethodButton = document.createElement('button');
    addPaymentMethodButton.className = 'add-payment-method-button';
    addPaymentMethodButton.innerHTML = `
        <span class="light-12">추가하기</span>
    `;
    dropdownOptions.appendChild(addPaymentMethodButton);

    //
    //  결제 수단 추가 모달
    //

    const modal = createModal({
        okText: '추가',
        onOk: () => {
            const input = modal.querySelector('.input-payment-method');
            formStore.addPaymentMethod(input.value);

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

    paymentMethodItem.reset = () => {
        hiddenInput.value = '';
        selectLabel.textContent = '선택하세요';
        selectLabel.style.color = 'var(--neutral-text-weak)';
    };

    paymentMethodItem.validate = () => {
        return hiddenInput.value.trim().length > 0;
    };

    return paymentMethodItem;
};

export default createPaymentMethod;
