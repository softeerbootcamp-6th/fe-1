import { formatNumberInput } from '../../../lib/utils.js';

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

let isMinus = true;

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

    amountButton.addEventListener('click', (event) => {
        event.preventDefault();
        isMinus = !isMinus;
        const currentIcon = isMinus ? icon.minus : icon.plus;
        amountIcon.src = currentIcon.src;
        amountIcon.alt = currentIcon.alt;
    });

    amountInput.addEventListener('input', (event) => {
        event.target.value = formatNumberInput(event.target.value);
    });

    return amountItem;
};

export default createAmount;
