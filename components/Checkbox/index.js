const CheckboxIcon = {
    checkbox: {
        icon: '/assets/icons/checkbox.svg',
        alt: 'Checkbox Icon',
    },
    uncheckbox: {
        icon: '/assets/icons/uncheckbox.svg',
        alt: 'Uncheckbox Icon',
    },
};

const createCheckbox = ({ id, checked = true, onClick, children }) => {
    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'checkbox-button-container';

    checkboxContainer.innerHTML = `
        <button class="checkbox-button" id="${id}">
            <img
                src="${
                    checked
                        ? CheckboxIcon.checkbox.icon
                        : CheckboxIcon.uncheckbox.icon
                }"
                alt="${
                    checked
                        ? CheckboxIcon.checkbox.alt
                        : CheckboxIcon.uncheckbox.alt
                }"
                width="16"
                height="16"
            />
        </button>
        ${children}
    `;

    const button = checkboxContainer.querySelector('.checkbox-button');
    const img = button.querySelector('img');

    let isChecked = checked;

    const updateIcon = () => {
        img.src = isChecked
            ? CheckboxIcon.checkbox.icon
            : CheckboxIcon.uncheckbox.icon;
        img.alt = isChecked
            ? CheckboxIcon.checkbox.alt
            : CheckboxIcon.uncheckbox.alt;
    };

    button.addEventListener('click', () => {
        isChecked = !isChecked;
        updateIcon();
        if (onClick) onClick(isChecked);
    });

    // Public API
    checkboxContainer.isChecked = () => isChecked;
    checkboxContainer.setChecked = (checked) => {
        isChecked = checked;
        updateIcon();
    };
    checkboxContainer.toggle = () => {
        isChecked = !isChecked;
        updateIcon();
        return isChecked;
    };

    return checkboxContainer;
};

export default createCheckbox;
