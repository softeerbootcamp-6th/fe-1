import createDate from './Items/date.js';
import createAmount from './Items/amount.js';
import createContent from './Items/content.js';
import createPaymentMethod from './Items/paymentMethod.js';
import createCategory from './Items/category.js';

function createInputBar() {
    const container = document.createElement('div');
    container.className = 'input-bar-container';

    const dateItem = createDate();
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
