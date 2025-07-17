import { createForm } from '../Form/index.js';

import createDate from './InputItems/date.js';
import createAmount from './InputItems/amount.js';
import createDescription from './InputItems/description.js';
import createPaymentMethod from './InputItems/paymentMethod.js';
import createCategory from './InputItems/category.js';
import createSubmitButton from './submitButton.js';

const DEFAULT_FORM_ITEMS_CONFIG = [
    createDate,
    createAmount,
    createDescription,
    createPaymentMethod,
    createCategory,
    createSubmitButton,
];

export default function createInputBar() {
    const form = document.createElement('form');
    form.className = 'input-bar-container';

    return createForm(form, DEFAULT_FORM_ITEMS_CONFIG);
}
