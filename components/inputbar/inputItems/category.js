import { createElement } from '../../../utils.js';
import formData from '../../../store/formData.js';
import categoryInputOption from './categoryOption.js';

function categoryInputTpl() {
    return `
        <div class="dropdown-category">
            <span class="dropdown-main-category">
                <label for="categoryInput" class="dropdown-label lt-12">분류</label>
                <span class="select-btn">
                    <span id="dropdown-toggle-category" class="dropdown-btn sb-12">
                        선택하세요
                    </span>
                    <img width="32" height="16" src="/public/chevron-down.svg"/>
                </span>
            </span>
        </div>
    `;
}

export default function createCategoryInput() {
    const categoryInputInnerHtml = categoryInputTpl();
    const $categoryInputItem = createElement(
        'div',
        {
            class: 'category-wrapper',
        },
        categoryInputInnerHtml,
    );

    addCategoryClickListener($categoryInputItem);

    return $categoryInputItem;
}

function addCategoryClickListener($rootEl) {
    $rootEl
        .querySelector('.dropdown-main-category')
        .addEventListener('click', () => {
            const sign = formData.sign;
            const $dropdown = $rootEl.querySelector('.dropdown-category');
            if (sign) {
                $dropdown.appendChild(categoryInputOption(sign));
            } else {
                $dropdown.appendChild(categoryInputOption(sign));
            }

            const $backgroud = createElement(
                'div',
                { class: 'select-background' },
                '',
            );

            $dropdown.appendChild($backgroud);

            $backgroud.addEventListener('click', (e) => {
                e.stopPropagation();
                $dropdown.querySelector('#dropdown-List-category').remove();
                $backgroud.remove();
            });
        });
}
