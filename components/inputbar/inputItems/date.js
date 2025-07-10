import { createElement } from '../../../utils.js';

export default function () {
    const dateInputInnerHtml = `
            <label for="dateInput" class="lt-12">일자</label>
            <input id="dateInput" type="date" class="sb-12" />
        `;

    const $dateInputItem = createElement(
        'div',
        {
            class: 'date-wrapper',
        },
        dateInputInnerHtml,
    );

    return $dateInputItem;
}
