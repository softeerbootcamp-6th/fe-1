import { extractNumbersOnly } from '../../lib/utils.js';

export default function createInputBar(formItemsConfig) {
    if (!formItemsConfig) {
        throw new Error('formItemsConfig is required');
    }

    const form = createForm(formItemsConfig);
    initInputBar(form);
    return form;
}

function createForm(formItemsConfig) {
    if (!formItemsConfig) {
        throw new Error('formItemsConfig is required');
    }

    const form = document.createElement('form');
    form.className = 'input-bar-container';

    formItemsConfig.forEach((createItem) => {
        const item = createItem();
        form.appendChild(item);
    });

    return form;
}

function initInputBar(form) {
    form.addEventListener('submit', handleFormSubmit);
    setInitialState(form);
    setupRealTimeValidation(form);
}

function setupRealTimeValidation(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (!submitButton) return;

    updateSubmitButtonState(form, submitButton);

    const inputs = form.querySelectorAll('input');
    inputs.forEach((input) => {
        input.addEventListener('input', () =>
            updateSubmitButtonState(form, submitButton)
        );
    });
}

function updateSubmitButtonState(form, submitButton) {
    const formData = collectFormData(form);
    const isValid = validateFormData(formData);

    submitButton.style.opacity = isValid ? '1' : '0.5';
    submitButton.style.cursor = isValid ? 'pointer' : 'not-allowed';
    submitButton.disabled = !isValid;
}

function handleFormSubmit(event) {
    event.preventDefault();

    const formData = collectFormData(event.target);
    if (!validateFormData(formData)) {
        return;
    }

    resetForm(event.target);
}

function collectFormData(form) {
    const formData = new FormData(form);
    return {
        date: formData.get('date') || new Date().toISOString().split('T')[0],
        amount: parseFloat(extractNumbersOnly(formData.get('amount'))) || 0,
        content: formData.get('content') || '',
        paymentMethod: formData.get('paymentMethod') || '',
        category: formData.get('category') || '',
    };
}

function validateFormData(data) {
    if (!data.amount || data.amount === 0) {
        return false;
    }

    if (!data.content.trim()) {
        return false;
    }

    if (!data.paymentMethod) {
        return false;
    }

    if (!data.category) {
        return false;
    }

    return true;
}

function setInitialState(form) {
    const dateInput = form.querySelector('input[name="date"]');
    if (dateInput && !dateInput.value) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }

    const paymentMethodInput = form.querySelector(
        'input[name="paymentMethod"]'
    );
    if (paymentMethodInput) {
        const paymentMethodContainer =
            paymentMethodInput.closest('.input-bar-item');
        const paymentMethodLabel =
            paymentMethodContainer.querySelector('.select-label');
        if (paymentMethodLabel) {
            paymentMethodLabel.textContent = '선택하세요';
            paymentMethodLabel.style.color = 'var(--neutral-text-weak)';
        }
    }

    const categoryInput = form.querySelector('input[name="category"]');
    if (categoryInput) {
        const categoryContainer = categoryInput.closest('.input-bar-item');
        const categoryLabel = categoryContainer.querySelector('.select-label');
        if (categoryLabel) {
            categoryLabel.textContent = '선택하세요';
            categoryLabel.style.color = 'var(--neutral-text-weak)';
        }
    }
}

function resetForm(form) {
    form.reset();
    setInitialState(form);

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        updateSubmitButtonState(form, submitButton);
    }
}
