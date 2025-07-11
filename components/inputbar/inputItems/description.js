import { createElement } from '../../../utils.js';
import formData from '../../../store/formData.js';

export default function createDescriptionInput() {
    const descriptionInputInnerHtml = `
            <span class="count-box-header">
                <label for="descriptionInput" class="lt-12"> 내용 </label>
                <span class="count-box lt-12"> <span id="current-text-length"> 0</span>/32</span>
            </span>
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

    const $input = $descriptionInputItem.querySelector('#descriptionInput');
    const $currentLength = $descriptionInputItem.querySelector(
        '#current-text-length',
    );

    $input.addEventListener('input', (e) => {
        $currentLength.textContent = e.target.value.length;
    });

    const $descriptionInput =
        $descriptionInputItem.querySelector('#descriptionInput');
    $descriptionInput.addEventListener('input', (e) => {
        formData.setDescription(e.target.value);
    });

    return $descriptionInputItem;
}
