import { createForm } from '../Form/index.js';

import createDate from './InputItems/date.js';
import createAmount from './InputItems/amount.js';
import createDescription from './InputItems/description.js';
import createPaymentMethod from './InputItems/paymentMethod.js';
import createCategory from './InputItems/category.js';
import createSubmitButton from './submitButton.js';

const DEFAULT_FORM_ITEMS_CONFIG = [
    {
        name: 'date',
        createElement: createDate,
        defaultValue: new Date().toISOString().split('T')[0],
    },
    {
        name: 'amount',
        createElement: createAmount,
        defaultValue: '',
    },
    {
        name: 'description',
        createElement: createDescription,
        defaultValue: '',
    },
    {
        name: 'paymentMethod',
        createElement: createPaymentMethod,
        defaultValue: '',
    },
    {
        name: 'category',
        createElement: createCategory,
        defaultValue: '',
        placeholder: '선택하세요',
    },
    {
        name: 'submitButton',
        createElement: createSubmitButton,
    },
];

export default function createInputBar() {
    const form = document.createElement('form');
    form.className = 'input-bar-container';

    return createForm(form, DEFAULT_FORM_ITEMS_CONFIG);
}
