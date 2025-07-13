import createInputBar from '../components/InputBar/index.js';
import createMonthlyInfo from '../components/MonthlyInfo/index.js';

import createDate from '../components/InputBar/InputItems/date.js';
import createAmount from '../components/InputBar/InputItems/amount.js';
import createContent from '../components/InputBar/InputItems/content.js';
import createPaymentMethod from '../components/InputBar/InputItems/paymentMethod.js';
import createCategory from '../components/InputBar/InputItems/category.js';
import createSubmitButton from '../components/InputBar/submitButton.js';

const DEFAULT_FORM_ITEMS_CONFIG = [
    createDate,
    createAmount,
    createContent,
    createPaymentMethod,
    createCategory,
    createSubmitButton,
];

export function createMain() {
    const inputBar = createInputBar(DEFAULT_FORM_ITEMS_CONFIG);
    const monthlyInfo = createMonthlyInfo();

    return [inputBar, monthlyInfo];
}
