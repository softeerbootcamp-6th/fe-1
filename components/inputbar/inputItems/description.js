import { createElement } from '../../../utils.js';
import formData from '../../../store/formData.js';

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

    const $descriptionInput =
        $descriptionInputItem.querySelector('#descriptionInput');
    $descriptionInput.addEventListener('input', (e) => {
        formData.setDescription(e.target.value);
    });

    return $descriptionInputItem;
}
