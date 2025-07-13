const createCategory = () => {
    const categoryItem = document.createElement('div');
    categoryItem.className = 'input-bar-item';
    categoryItem.innerHTML = `
        <div class="input-bar-item-wrapper">
            <label for="category" class="light-12"> 분류 </label>
        </div>
        <div class="input-bar-item-wrapper">
            <input type="hidden" name="category" id="category" value="" />
            <div class="select-container semibold-12">
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

    return categoryItem;
};

export default createCategory;
