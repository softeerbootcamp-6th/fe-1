import createAmount from './Items/amount.js';
import createContent from './Items/content.js';
import createPaymentMethod from './Items/paymentMethod.js';
import createCategory from './Items/category.js';

function createInputBar() {
    const container = document.createElement('div');
    container.className = 'input-bar-container';

    const dateItem = document.createElement('div');
    dateItem.className = 'input-bar-item';
    dateItem.innerHTML = `
        <div class="input-bar-item-wrapper">
            <label for="date-input" class="light-12">일자</label>
        </div>
        <div class="input-bar-item-wrapper">
            <input type="date" id="date-input" />
        </div>
    `;
    container.appendChild(dateItem);

    const amountItem = createAmount();
    container.appendChild(amountItem);

    const contentItem = createContent();
    container.appendChild(contentItem);

    const paymentMethodItem = createPaymentMethod();
    container.appendChild(paymentMethodItem);

    const categoryItem = createCategory();
    container.appendChild(categoryItem);

    const submitBtn = document.createElement('button');
    submitBtn.className = 'submit-button';
    submitBtn.innerHTML = `
        <img
            src="/assets/icons/check.svg"
            alt="check icon"
            width="24"
            height="24"
            class="submit-icon"
        />
    `;

    container.appendChild(submitBtn);

    return container;
}

const mainPlaceholder = document.getElementById('main-placeholder');
mainPlaceholder.innerHTML = '';
const inputBar = createInputBar();
mainPlaceholder.appendChild(inputBar);
