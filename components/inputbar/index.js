import createDateInputElement from './inputItems/date.js';
import createCategoryInputElement from './inputItems/category.js';
import createValueInputElement from './inputItems/value.js';
import createDescriptionInputElement from './inputItems/description.js';
import createPaymentInputElement from './inputItems/payment.js';
import createSummitBtnElemnt from './summitBtn.js';

function createInputBox() {
    const $rootElement = document.getElementById('input-placeholder');

    const $dateInputElement = createDateInputElement();
    const $valueInputElement = createValueInputElement();
    const $descriptionInputElement = createDescriptionInputElement();
    const $paymentInputElement = createPaymentInputElement();
    const $categoryInputElement = createCategoryInputElement();
    const $summitBtnElement = createSummitBtnElemnt();

    $rootElement.appendChild($dateInputElement);
    $rootElement.appendChild($valueInputElement);
    $rootElement.appendChild($descriptionInputElement);
    $rootElement.appendChild($paymentInputElement);
    $rootElement.appendChild($categoryInputElement);
    $rootElement.appendChild($summitBtnElement);

    setNowDate();
}

function setNowDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dateInput').value = today;
}

export { setNowDate, createInputBox };
