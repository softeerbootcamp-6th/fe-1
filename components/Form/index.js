export function createForm(form) {
    form._formItemsConfig.forEach((item) => {
        form.appendChild(item.element);
    });

    initForm(form);

    return form;
}

function initForm(form) {
    resetForm(form);
    setupRealTimeValidation(form);
    form.addEventListener('submit', handleFormSubmit);
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
    const isValid = validateForm(form);

    submitButton.style.opacity = isValid ? '1' : '0.5';
    submitButton.style.cursor = isValid ? 'pointer' : 'not-allowed';
    submitButton.disabled = !isValid;
}

function validateForm(form) {
    const formItems = form.querySelectorAll('.input-bar-item');
    return Array.from(formItems).every((item) => {
        return !item.validate || item.validate();
    });
}

function handleFormSubmit(event) {
    event.preventDefault();

    if (!validateForm(event.target)) {
        return;
    }

    const rawFormData = collectFormData(event.target);

    if (event.target._onSubmit) {
        event.target._onSubmit(rawFormData);
    }

    resetForm(event.target);

    const submitButton = event.target.querySelector('button[type="submit"]');
    if (submitButton) {
        updateSubmitButtonState(event.target, submitButton);
    }
}

function collectFormData(form) {
    const formData = new FormData(form);
    const result = {};

    form._formItemsConfig.forEach((item) => {
        if (item.name !== 'submitButton') {
            result[item.name] = formData.get(item.name);
        }
    });

    return result;
}

function resetForm(form) {
    const formItems = form.querySelectorAll('.input-bar-item');
    formItems.forEach((item) => {
        if (item.reset) {
            item.reset();
        }
    });
}
