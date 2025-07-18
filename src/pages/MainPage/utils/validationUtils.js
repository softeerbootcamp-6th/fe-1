import { getInputElements } from './inputElementUtils.js';

export function isInputValid({ dateInput, amountInput, contentInput, paymentSelect, categorySelect }) {
    return (
        dateInput.value.trim() !== '' &&
        !isNaN(parseFloat(amountInput.value)) &&
        contentInput.value.trim() !== '' &&
        paymentSelect.value.trim() !== '' &&
        categorySelect.value.trim() !== ''
    );
}

export function updateCheckButtonState(isValid) {
    const { checkButton } = getInputElements();
    if (!checkButton) return;

    checkButton.disabled = !isValid;
    checkButton.classList.toggle('disabled', !isValid);
    checkButton.style.cursor = isValid ? 'pointer' : 'not-allowed';

    const img = checkButton.querySelector('img');
    if (img) {
        img.src = `assets/icons/${isValid ? 'check-button-active' : 'check-button'}.svg`;
    }
}

export function validateInputs() {
    const elements = getInputElements();
    const isValid = isInputValid(elements);
    updateCheckButtonState(isValid);
}
