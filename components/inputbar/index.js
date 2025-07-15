import createDateInput from './inputItems/date.js';
import createCategoryInput from './inputItems/category.js';
import createAmountInput from './inputItems/amount.js';
import createDescriptionInput from './inputItems/description.js';
import createPaymentInput from './inputItems/payment.js';
import createSummitButton from './summitBtn.js';

export default function initalizeInputBox() {
    const $rootElement = document.getElementById('input-placeholder');

    const $dateInputElement = createDateInput();
    const $valueInputElement = createAmountInput();
    const $descriptionInputElement = createDescriptionInput();
    const $paymentInputElement = createPaymentInput();
    const $categoryInputElement = createCategoryInput();
    const $summitBtnElement = createSummitButton();

    [
        $dateInputElement,
        $valueInputElement,
        $descriptionInputElement,
        $paymentInputElement,
        $categoryInputElement,
        $summitBtnElement,
    ].forEach(($el) => $rootElement.appendChild($el));

    setNowDate();
}

function setNowDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dateInput').value = today;
}
