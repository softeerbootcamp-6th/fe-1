import { formatNumberWithCommas } from '../../../lib/utils.js';
import { categoryConfig } from './categoryConfig.js';
import paymentDataStore from '../../../store/paymentData.js';

function createDetailListItem({
    id,
    category,
    description,
    paymentMethod,
    amount,
}) {
    const categoryLabel = categoryConfig[category].text || '미분류';
    const categoryColor = categoryConfig[category].color;
    const isIncome = amount > 0 ? 'income' : 'expense';

    const itemElement = document.createElement('li');
    itemElement.className = 'daily-info-detail-list-item';
    itemElement.innerHTML = `
        <div class="category" style="background-color: var(--${categoryColor})">
            <span class="light-12">${categoryLabel}</span>
        </div>
        <span class="description light-14">${description}</span>
        <span class="payment-method light-14">${paymentMethod}</span>
        <span class="amount ${isIncome} light-14">
            ${formatNumberWithCommas(amount)}원
        </span>
        <button class="delete-button">
            <div class="delete-button-icon"></div>
            <span class="semibold-12 delete-button-label">삭제</span>
        </button>
    `;

    function init() {
        const deleteButtonElement = itemElement.querySelector('.delete-button');
        deleteButtonElement.addEventListener('click', () => {
            paymentDataStore.deletePaymentData(id);
            itemElement.remove();
        });
    }

    init();

    return itemElement;
}

export default createDetailListItem;
