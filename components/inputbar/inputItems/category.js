import { createElement } from '../../../utils.js';
import formData from '../../../store/formData.js';
import categoryInputOption from './categoryOption.js';

function categoryInputTpl() {
    return `
        <div class="dropdown">
            <span class="dropdown-main">
                <label for="categoryInput" class="dropdown-label lt-12">분류</label>
                <span class="select-btn">
                    <span id="dropdownToggle" class="dropdown-btn sb-12">
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

    $categoryInputItem
        .querySelector('.dropdown-main')
        .addEventListener('click', () => {
            const sign = formData.sign;
            const $dropdown = $categoryInputItem.querySelector('.dropdown');
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
                $dropdown.querySelector('#dropdownList').remove();
                $backgroud.remove();
            });
        });

    return $categoryInputItem;
}
