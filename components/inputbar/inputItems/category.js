import { createElement } from '../../../utils.js';
import formData from '../../../store/formData.js';

export default function createCategoryInput() {
    const categoryInputInnerHtml = `
            <label for="categoryInput" class="lt-12">분류</label>
            <select id="categoryInput">
                <option>생활</option>
                <option>식비</option>
                <option>문화/여가</option>
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
