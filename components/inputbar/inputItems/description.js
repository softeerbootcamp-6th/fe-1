import { createElement } from '../../../utils.js';

export default function () {
    const descriptionInputInnerHtml = `
            <label for="descriptionInput" class="lt-12">
                내용
            </label>
            <input
                placeholder="입력하세요"
                id="descriptionInput"
                type="text"
                class="sb-12"
                maxlength="32"
            />
        `;

    const $descriptionInputItem = createElement(
        'div',
        {
            class: 'description-wrapper',
        },
        descriptionInputInnerHtml,
    );

    return $descriptionInputItem;
}
