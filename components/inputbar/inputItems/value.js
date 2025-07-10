import { createElement } from '../../../utils.js';

export default function () {
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
                <input id="valueInput" type="number" class="sb-12" />
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

    return $valueInputItem;
}
