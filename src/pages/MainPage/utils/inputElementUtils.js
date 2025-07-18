export function getInputElements() {
    return {
        dateInput: document.getElementById('date-select'),
        amountInput: document.querySelector('.amount-field'),
        contentInput: document.querySelector('.content-field'),
        paymentSelect: document.getElementById('payment-field'),
        categorySelect: document.getElementById('category-select'),
        checkButton: document.getElementById('submit-btn'),
    };
}