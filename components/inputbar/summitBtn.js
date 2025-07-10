import { createElement } from '../../utils.js';

export default function () {
    const summitBtnInnerHtml = `
            <button class="add-button">
                <img
                    src="/public/check.svg"
                    width="24px"
                    height="24px"
                />
            </button>
        `;

    const $summitBtn = createElement(
        'div',
        {
            class: 'add-button-wrappe',
        },
        summitBtnInnerHtml,
    );

    return $summitBtn;
}
