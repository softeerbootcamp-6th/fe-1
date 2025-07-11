import { createElement } from '../../../utils.js';
import formData from '../../../store/formData.js';

export default function createCategoryInput() {
    const categoryInputInnerHtml = `
            <label for="categoryInput" class="lt-12">분류</label>
            <select id="categoryInput">
                <option>dfasdf</option>
                <option>ffe312</option>
                <option>fasess</option>
            </select>
        `;

    const $categorynputItem = createElement(
        'div',
        {
            class: 'category-wrapper',
        },
        categoryInputInnerHtml,
    );

    const $categoryInput = $categorynputItem.querySelector('#categoryInput');
    $categoryInput.addEventListener('change', (e) => {
        formData.setCategory(e.target.value);
    });

    return $categorynputItem;
}
