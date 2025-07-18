import { createDropdownOptions } from '../../DropdownOption/index.js';
import { toggle } from '../../../lib/utils.js';
import {
    incomeCategoryConfig,
    expenseCategoryConfig,
} from '../../DailyInfo/DetailListItem/categoryConfig.js';

const incomeCategories = Object.keys(incomeCategoryConfig).map((key) => ({
    value: key,
    label: incomeCategoryConfig[key].text,
}));

const expenseCategories = Object.keys(expenseCategoryConfig).map((key) => ({
    value: key,
    label: expenseCategoryConfig[key].text,
}));

const createCategory = () => {
    const categoryItem = document.createElement('div');
    categoryItem.className = 'input-bar-item';
    categoryItem.innerHTML = `
        <div class="input-bar-item-wrapper">
            <label for="category" class="light-12"> 분류 </label>
        </div>
        <div class="input-bar-item-wrapper select-container">
            <input type="hidden" name="category" id="category" value="" />
            <div class="select-label semibold-12">
                선택하세요
            </div>
            <img
                src="/assets/icons/chevron-down.svg"
                alt="Chevron Down Icon"
                width="16"
                height="16"
            />
        </div>
    `;

    const selectContainer = categoryItem.querySelector('.select-container');
    const selectLabel = categoryItem.querySelector('.select-label');
    const hiddenInput = categoryItem.querySelector('input[name="category"]');

    selectLabel.style.color = 'var(--neutral-text-weak)';

    let currentDropdownOptions = null;

    const updateCategories = (isIncome = false) => {
        if (currentDropdownOptions) {
            currentDropdownOptions.remove();
        }

        const categories = isIncome ? incomeCategories : expenseCategories;

        currentDropdownOptions = createDropdownOptions(
            categories,
            (value, label) => {
                selectLabel.textContent = label;
                selectLabel.style.color = 'var(--neutral-text-default)';
                hiddenInput.value = value;
                hiddenInput.dispatchEvent(
                    new Event('input', { bubbles: true })
                );
            },
            false
        );

        categoryItem.appendChild(currentDropdownOptions);
    };

    updateCategories(false);

    categoryItem.updateCategories = updateCategories;

    selectContainer.addEventListener('click', () => {
        toggle(currentDropdownOptions);
    });

    document.addEventListener('incomeModeChanged', (event) => {
        updateCategories(event.detail.isIncomeMode);
    });

    categoryItem.reset = () => {
        hiddenInput.value = '';
        selectLabel.textContent = '선택하세요';
        selectLabel.style.color = 'var(--neutral-text-weak)';
    };

    categoryItem.validate = () => {
        return hiddenInput.value.trim().length > 0;
    };

    categoryItem.setValue = (value) => {
        const categories = expenseCategories.concat(incomeCategories);

        const category = categories.find(
            (category) => category.value === value
        );

        if (category) {
            hiddenInput.value = value;
            selectLabel.textContent = category.label;
            selectLabel.style.color = 'var(--neutral-text-default)';
            hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
    };

    return categoryItem;
};

export default createCategory;
