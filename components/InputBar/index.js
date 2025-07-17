import { getUUID, extractNumbersOnly } from '../../lib/utils.js';
import { createForm } from '../Form/index.js';
import paymentDataStore from '../../store/paymentData.js';
import formStore from '../../store/form.js';

import createDate from './InputItems/date.js';
import createAmount from './InputItems/amount.js';
import createDescription from './InputItems/description.js';
import createPaymentMethod from './InputItems/paymentMethod.js';
import createCategory from './InputItems/category.js';
import createSubmitButton from './submitButton.js';

const DEFAULT_FORM_ITEMS_CONFIG = [
    {
        name: 'date',
        element: createDate(),
    },
    {
        name: 'amount',
        element: createAmount(),
    },
    {
        name: 'description',
        element: createDescription(),
    },
    {
        name: 'paymentMethod',
        element: createPaymentMethod(),
    },
    {
        name: 'category',
        element: createCategory(),
    },
    {
        name: 'submitButton',
        element: createSubmitButton(),
    },
];

export default function createInputBar() {
    const form = document.createElement('form');
    form.className = 'input-bar-container';

    form._formItemsConfig = DEFAULT_FORM_ITEMS_CONFIG;
    form._onSubmit = onSubmit;

    function onSubmit(formData) {
        const isIncomeMode = formStore.getIsIncomeMode();
        const amountNumber = Number(extractNumbersOnly(formData.amount));
        const amount = isIncomeMode ? amountNumber : -amountNumber;

        const formattedData = {
            id: getUUID(),
            category: formData.category,
            description: formData.description,
            paymentMethod: formData.paymentMethod,
            amount: amount,
            paidAt: formData.date,
            createdAt: formData.date,
        };

        paymentDataStore.addPaymentData(formattedData);
    }

    return createForm(form);
}
