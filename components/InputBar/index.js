import createDate from './InputItems/date.js';
import createAmount from './InputItems/amount.js';
import createContent from './InputItems/content.js';
import createPaymentMethod from './InputItems/paymentMethod.js';
import createCategory from './InputItems/category.js';
import createSubmitButton from './submitButton.js';

function createInputBar() {
    const container = document.createElement('div');
    container.className = 'input-bar-container';

    const dateItem = createDate();
    const amountItem = createAmount();
    const contentItem = createContent();
    const paymentMethodItem = createPaymentMethod();
    const categoryItem = createCategory();
    const submitButton = createSubmitButton();

    container.appendChild(dateItem);
    container.appendChild(amountItem);
    container.appendChild(contentItem);
    container.appendChild(paymentMethodItem);
    container.appendChild(categoryItem);
    container.appendChild(submitButton);

    return container;
}

const mainPlaceholder = document.getElementById('main-placeholder');
mainPlaceholder.innerHTML = '';
const inputBar = createInputBar();
mainPlaceholder.appendChild(inputBar);
