import createDate from './InputItems/date.js';
import createAmount from './InputItems/amount.js';
import createContent from './InputItems/content.js';
import createPaymentMethod from './InputItems/paymentMethod.js';
import createCategory from './InputItems/category.js';

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
