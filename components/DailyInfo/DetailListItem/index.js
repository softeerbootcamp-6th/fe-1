import { formatNumberWithCommas } from '../../../lib/utils.js';
import { categoryConfig } from './categoryConfig.js';
import paymentDataStore from '../../../store/paymentData.js';
import formStore from '../../../store/form.js';
import createModal from '../../Modal/index.js';

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
    const paymentMethodLabel =
        formStore.paymentMethodOptions.find(
            (option) => option.value === paymentMethod
        )?.label || '미분류';

    const itemElement = document.createElement('li');
    itemElement.className = 'daily-info-detail-list-item';
    itemElement.innerHTML = `
        <div class="category" style="background-color: var(--${categoryColor})">
            <span class="light-12">${categoryLabel}</span>
        </div>
        <span class="description light-14">${description}</span>
        <span class="payment-method light-14">${paymentMethodLabel}</span>
        <span class="amount ${isIncome} light-14">
            ${formatNumberWithCommas(amount)}원
        </span>
        <button class="delete-button">
            <div class="delete-button-icon"></div>
            <span class="semibold-12 delete-button-label">삭제</span>
        </button>
    `;

    const modal = createModal({
        okText: '삭제',
        onOk: () => {
            paymentDataStore.deletePaymentData(id);
            itemElement.remove();
        },
        okTextColor: 'var(--danger-text-default)',
        content: `
            <span class="light-16">해당 내역을 삭제하시겠습니까?</span>
            <span class="light-12">
                · 카테고리: ${isIncome ? '수입' : '지출'} / ${categoryLabel}
            </span>
            <span class="light-12">
                · 내용: ${description}
            </span>
            <span class="light-12">
                · 결제 수단: ${paymentMethodLabel}
            </span>
            <span class="light-12">
                · 금액: ${formatNumberWithCommas(amount)}원
            </span>
        `,
    });

    const deleteButtonElement = itemElement.querySelector('.delete-button');
    deleteButtonElement.addEventListener('click', () => {
        modal.open();
    });

    return itemElement;
}

export default createDetailListItem;
