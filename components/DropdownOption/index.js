import { close } from '../../lib/utils.js';
import formStore from '../../store/form.js';

const createDropdownOption = (option, deleteOption) => {
    const optionContainer = document.createElement('li');
    optionContainer.className = 'dropdown-option-container';

    optionContainer.innerHTML = `
        <div class="dropdown-option" data-value="${option.value}">
            <span class="light-12 option-label">${option.label}</span>
            ${
                deleteOption
                    ? `
                        <img 
                            src="/assets/icons/closed.red.svg" 
                            alt="Delete Icon" 
                            width="24" 
                            height="24" 
                            class="option-delete-button"
                        />
                    `
                    : ''
            }
        </div>
    `;

    if (deleteOption) {
        const deleteButton = optionContainer.querySelector(
            '.option-delete-button'
        );
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            optionContainer.remove();
            formStore.deletePaymentMethod(option.value);
        });
    }

    return optionContainer;
};

const createDropdownOptions = (options, onSelect, deleteOption) => {
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'dropdown-container';
    optionsContainer.style.display = 'none';

    const optionsList = document.createElement('ul');
    optionsList.className = 'dropdown-options-list';
    optionsContainer.appendChild(optionsList);

    options.forEach((option) => {
        const optionElement = createDropdownOption(option, deleteOption);
        optionsList.appendChild(optionElement);
    });

    optionsContainer.addEventListener('click', (event) => {
        const optionElement = event.target.closest('.dropdown-option');
        if (optionElement) {
            const value = optionElement.dataset.value;
            const label =
                optionElement.querySelector('.option-label').textContent;
            if (onSelect) {
                onSelect(value, label);
            }
            close(optionsContainer);
        }
    });

    document.addEventListener('paymentMethodOptionsAdded', (event) => {
        const newOptions = createDropdownOption(
            event.detail.newPaymentMethod,
            deleteOption
        );
        optionsList.appendChild(newOptions);
    });

    return optionsContainer;
};

export { createDropdownOptions };
