import {
    formatNumberInput,
    formatNumberWithCommas,
} from '../../../lib/utils.js';
import formStore from '../../../store/form.js';

const icon = {
    plus: {
        src: '/assets/icons/plus.svg',
        alt: 'Plus Icon',
    },
    minus: {
        src: '/assets/icons/minus.svg',
        alt: 'Minus Icon',
    },
};

const createAmount = () => {
    const amountItem = document.createElement('div');
    amountItem.className = 'input-bar-item';
    amountItem.innerHTML = `
        <div class="input-bar-item-wrapper">
            <label for="amount" class="light-12">금액</label>
        </div>
        <div class="input-bar-item-wrapper">
            <button type="button" class="amount-button">
                <img
                    src="${icon.minus.src}"
                    alt="${icon.minus.alt}"
                    width="16"
                    height="16"
                />
            </button>
            <input
                type="text"
                id="amount"
                name="amount"
                class="semibold-12 amount-input"
                placeholder="0"
            />
            <span class="light-14">원</span>
        </div>
    `;

    const amountButton = amountItem.querySelector('.amount-button');
    const amountIcon = amountButton.querySelector('img');
    const amountInput = amountItem.querySelector('.amount-input');

    function renderIcon(isIncome) {
        const currentIcon = isIncome ? icon.plus : icon.minus;
        amountIcon.src = currentIcon.src;
        amountIcon.alt = currentIcon.alt;
    }

    amountButton.addEventListener('click', (event) => {
        event.preventDefault();

        const isIncome = formStore.toggleIncomeMode();
        renderIcon(isIncome);
    });

    amountInput.addEventListener('input', (event) => {
        event.target.value = formatNumberInput(event.target.value);
    });

    amountItem.reset = () => {
        amountInput.value = '';
    };

    amountItem.validate = () => {
        const value = parseFloat(amountInput.value.replace(/,/g, ''));
        return !isNaN(value) && value > 0;
    };

    amountItem.setValue = (value) => {
        renderIcon(formStore.getIsIncomeMode());

        amountInput.value = formatNumberWithCommas(Math.abs(value));

        amountInput.dispatchEvent(new Event('input', { bubbles: true }));
    };

    return amountItem;
};

export default createAmount;
