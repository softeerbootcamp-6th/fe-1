import formData from '../../../store/formData.js';
import { createElement } from '../../../utils.js';

const expenseCategorys = [
    '생활',
    '식비',
    '교통',
    '쇼핑/뷰티',
    '의료/건강',
    '문화/여가',
    '미분류',
];

const incomeCategorys = ['월급', '용돈', '기타 수입'];

export default function categoryInputOption(sign) {
    let items = [];
    if (sign) {
        items = [...incomeCategorys];
    } else {
        items = [...expenseCategorys];
    }

    const $categoryOptionItemInnerHtml = `
        ${items
            .map(
                (item) =>
                    `<li id="category-line" data-value="${item}">
                        <span class="lt-12">${item}</span>
                    </li>`,
            )
            .join('')}
    `;

    const $categoryOptionItem = createElement(
        'ul',
        {
            id: 'dropdown-List-category',
            class: 'dropdown-list-category',
        },
        $categoryOptionItemInnerHtml,
    );

    $categoryOptionItem.addEventListener('click', (e) => {
        const $targetLine = e.target.closest('#category-line');
        const selectedCategory = $targetLine.getAttribute('data-value');

        const $dropdownList = document.getElementById('dropdown-List-category');
        const $background = $dropdownList.nextElementSibling;

        $dropdownList.remove();
        $background.remove();

        document.getElementById('dropdown-toggle-category').textContent =
            selectedCategory;
        formData.setCategory(selectedCategory);
    });

    return $categoryOptionItem;
}
