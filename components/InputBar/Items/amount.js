const createAmount = () => {
    const amountItem = document.createElement('div');
    amountItem.className = 'input-bar-item';
    amountItem.innerHTML = `
        <div class="input-bar-item-wrapper">
            <label for="amount" class="light-12">금액</label>
        </div>
        <div class="input-bar-item-wrapper">
            <button class="amount-button">
                <img
                    src="/assets/icons/plus.svg"
                    alt="plus icon"
                    width="16"
                    height="16"
                />
            </button>
            <input
                type="number"
                id="amount"
                class="semibold-12"
                placeholder="0"
            />
            <span class="light-14">원</span>
        </div>
    `;

    return amountItem;
};

export default createAmount;
