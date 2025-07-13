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
}

function handleFormSubmit(event) {
    event.preventDefault();

    const formData = collectFormData(event.target);

    if (validateFormData(formData)) {
        resetForm(event.target);
    }
}

function collectFormData(form) {
    const formData = new FormData(form);
    return {
        date: formData.get('date') || new Date().toISOString().split('T')[0],
        amount: parseFloat(formData.get('amount')) || 0,
        content: formData.get('content') || '',
        paymentMethod: formData.get('paymentMethod') || '',
        category: formData.get('category') || '',
    };
}

function validateFormData(data) {
    if (!data.amount || data.amount === 0) {
        alert('금액을 입력해주세요.');
        return false;
    }

    if (!data.content.trim()) {
        alert('내용을 입력해주세요.');
        return false;
    }

    return true;
}

function setInitialState(form) {
    const dateInput = form.querySelector('input[name="date"]');
    if (dateInput && !dateInput.value) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
}

function resetForm(form) {
    form.reset();
    setInitialState(form);
}
