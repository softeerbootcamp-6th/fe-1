const createPaymentMethod = () => {
    const paymentMethodItem = document.createElement('div');
    paymentMethodItem.className = 'input-bar-item';
    paymentMethodItem.innerHTML = `
        <div class="input-bar-item-wrapper">
            <label for="payment-method" class="light-12">
                결제수단
            </label>
        </div>
        <div class="input-bar-item-wrapper">
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

    return paymentMethodItem;
};

export default createPaymentMethod;
