import { createElement } from '../../../utils.js';

export default function () {
    const categoryInputInnerHtml = `
            <label for="categoryInput" class="lt-12">분류</label>
            <select id="categoryInput">
                <option>dfasdf</option>
            </select>
        `;

    const $categorynputItem = createElement(
        'div',
        {
            class: 'category-wrapper',
        },
        categoryInputInnerHtml,
    );

    return $categorynputItem;
}
