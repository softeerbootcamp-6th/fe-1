import { createElement } from '../../../utils.js';
import formData from '../../../store/formData.js';

export default function createAmountInput() {
    const valueInputInnerHtml = `
            <label for="valueInput" class="lt-12">
                금액
            </label>
            <div class="value-box">
                <button>
                    <img
                        src="/public/minus.svg"
                        aria-label="마이너스 바 "
                        width="16px"
                    />
                </button>
                <input id="valueInput" type="text" class="sb-12" />
                <span>원</span>
            </div>
        `;

    const $valueInputItem = createElement(
        'div',
        {
            class: 'value-wrapper',
        },
        valueInputInnerHtml,
    );

    const $valueInput = $valueInputItem.querySelector('#valueInput');

    $valueInput.addEventListener('input', (e) => {
        const inputValue = e.target.value;
        const rawValue = inputValue.replace(/[^0-9]/g, '');
        const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        e.target.value = formattedValue;
        formData.setAmount(inputValue);
    });

    return $valueInputItem;
}
