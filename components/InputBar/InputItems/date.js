const createDate = () => {
    const dateItem = document.createElement('div');
    dateItem.className = 'input-bar-item';
    dateItem.innerHTML = `
        <div class="input-bar-item-wrapper">
            <label for="date-input" class="light-12">일자</label>
        </div>
        <div class="input-bar-item-wrapper">
            <input type="date" id="date-input" name="date" class="semibold-12" />
        </div>
    `;

    dateItem.reset = () => {
        const dateInput = dateItem.querySelector('input[name="date"]');
        dateInput.value = new Date().toISOString().split('T')[0];
    };

    dateItem.validate = () => {
        const dateInput = dateItem.querySelector('input[name="date"]');
        return dateInput.value.trim().length > 0;
    };

    dateItem.setValue = (value) => {
        const dateInput = dateItem.querySelector('input[name="date"]');
        dateInput.value = value;
        dateInput.dispatchEvent(new Event('input', { bubbles: true }));
    };

    return dateItem;
};

export default createDate;
