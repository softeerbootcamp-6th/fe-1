import { close } from '../../lib/utils.js';

const createDropdownOption = (option, deleteOption) => {
    const optionContainer = document.createElement('div');
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

    return optionContainer;
};

const createDropdownOptions = (options, onSelect, deleteOption) => {
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'dropdown-options';
    optionsContainer.style.display = 'none';

    options.forEach((option) => {
        const optionElement = createDropdownOption(option, deleteOption);
        optionsContainer.appendChild(optionElement);
    });

    optionsContainer.addEventListener('click', (event) => {
        if (
            deleteOption &&
            event.target.classList.contains('option-delete-button')
        ) {
            event.stopPropagation();
            close(optionsContainer);
            deleteDropdownOption(
                event.target.closest('.dropdown-option').dataset.value
            );
            return;
        }

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

    function deleteDropdownOption(value) {
        const optionElement = optionsContainer.querySelector(
            `.dropdown-option[data-value="${value}"]`
        );
        if (optionElement) {
            optionElement.remove();
        }
    }

    return optionsContainer;
};

export { createDropdownOptions };
