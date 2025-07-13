const createSubmitButton = () => {
    const submitButton = document.createElement('button');
    submitButton.className = 'submit-button';
    submitButton.type = 'submit';
    submitButton.innerHTML = `
            <img
                src="/assets/icons/check.svg"
                alt="check icon"
                width="24"
                height="24"
                class="submit-icon"
            />
        `;
    return submitButton;
};

export default createSubmitButton;
