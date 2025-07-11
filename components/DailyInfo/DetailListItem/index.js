import { formatNumberWithCommas } from '../../../lib/utils.js';
import categoryConfig from './categoryConfig.js';

function createDetailListItem({ category, description, payment, value }) {
    const categoryLabel = categoryConfig[category].text || '미분류';
    const categoryColor = categoryConfig[category].color;
    const isIncome = value > 0 ? 'income-value' : 'expense-value';

    const itemElement = document.createElement('li');
    itemElement.className = 'daily-info-detail-list';
    itemElement.innerHTML = `
        <div class="category" style="background-color: var(--${categoryColor})">
            <span class="light-12">${categoryLabel}</span>
        </div>
        <span class="description light-14">${description}</span>
        <span class="payment light-14">${payment}</span>
        <span class="value ${isIncome} light-14">
            ${formatNumberWithCommas(value)}원
        </span>
        <button class="delete-button">
            <div class="delete-button-icon"></div>
            <span class="semibold-12 delete-button-label">삭제</span>
        </button>
    `;

    function deleteItemElement() {
        itemElement.remove();
    }

    function init() {
        const deleteButtonElement = itemElement.querySelector('.delete-button');
        deleteButtonElement.addEventListener('click', () => {
            // 여기에다가 Modal 띄우는거 구현하기
            deleteItemElement();
        });
    }

    init();

    return itemElement;
}

export default createDetailListItem;
