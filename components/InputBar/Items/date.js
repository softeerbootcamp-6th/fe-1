const createDate = () => {
    const dateItem = document.createElement('div');
    dateItem.className = 'input-bar-item';
    dateItem.innerHTML = `
        <div class="input-bar-item-wrapper">
            <label for="date-input" class="light-12">일자</label>
        </div>
        <div class="input-bar-item-wrapper">
            <input type="date" id="date-input" />
        </div>
    `;

    return dateItem;
};

export default createDate;
