import { createElement, formatAmount } from '../../../utils.js';
import formData from '../../../store/formData.js';

const valueInputInnerHtml = `
        <label for="valueInput" class="lt-12">
            금액
        </label>
        <div class="value-box">
            <button id="toggle-sign">
                <img
                    id="sign"
                    src="/public/minus.svg"
                    aria-label="마이너스 바 "
                    width="16px"
                />
            </button>
            <input id="valueInput" type="text" class="sb-12" />
            <span>원</span>
        </div>
    `;

export default function createAmountInput() {
    const $valueInputItem = createElement(
        'div',
        {
            class: 'value-wrapper',
        },
        valueInputInnerHtml,
    );

    const $valueInput = $valueInputItem.querySelector('#valueInput');
    addAmountInputListener($valueInput, formData);

    const $toggleBtn = $valueInputItem.querySelector('#toggle-sign');
    addSignToggleClickListener($toggleBtn, formData);

    return $valueInputItem;
}

function addAmountInputListener($input, formData) {
    $input.addEventListener('input', (e) => {
        const inputValue = e.target.value;
        const rawValue = inputValue.replace(/[^0-9]/g, '');
        const formattedValue = formatAmount(rawValue);
        e.target.value = formattedValue;

        formData.setAmount(inputValue);
    });
}

function addSignToggleClickListener($button, formData) {
    $button.addEventListener('click', (e) => {
        const nowSrc = e.target.getAttribute('src');
        const isMinus = nowSrc.includes('minus');
        const newSrc = isMinus ? '/public/plus.svg' : '/public/minus.svg';

        e.target.setAttribute('src', newSrc);
        formData.setSign(!formData.sign);
    });
}
