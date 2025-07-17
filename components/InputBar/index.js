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

    let editingId = null;

    const formItemsMap = new Map(
        form._formItemsConfig.map((item) => [item.name, item.element])
    );

    form.enterEditMode = (id) => {
        const data = paymentDataStore.getPaymentDataById(id);
        if (!data) return;

        editingId = id;
        const isIncome = data.amount > 0;

        if (formStore.getIsIncomeMode() !== isIncome) {
            formStore.toggleIncomeMode();
        }

        const setters = [
            ['date', data.paidAt],
            ['amount', data.amount],
            ['description', data.description],
            ['category', data.category],
            ['paymentMethod', data.paymentMethod],
        ];

        setters.forEach(([fieldName, value]) => {
            const element = formItemsMap.get(fieldName);
            if (element?.setValue) {
                element.setValue(value);
            }
        });
    };

    function onSubmit(formData) {
        const isIncomeMode = formStore.getIsIncomeMode();
        const amountNumber = Number(extractNumbersOnly(formData.amount));
        const amount = isIncomeMode ? amountNumber : -amountNumber;

        const formattedData = {
            category: formData.category,
            description: formData.description,
            paymentMethod: formData.paymentMethod,
            amount: amount,
            paidAt: formData.date,
            createdAt: formData.date,
        };

        if (editingId) {
            paymentDataStore.updatePaymentData(editingId, formattedData);
            editingId = null;
        } else {
            paymentDataStore.addPaymentData({
                id: getUUID(),
                ...formattedData,
            });
        }
    }

    form.exitEditMode = () => {
        editingId = null;
    };

    document.addEventListener('editModeRequested', (event) => {
        form.enterEditMode(event.detail.id);
    });

    return createForm(form);
}
