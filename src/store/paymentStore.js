let paymentOriginal = ['현금', '신용카드'];
let paymentOptions = [...paymentOriginal];

const getPaymentOptions = () => {
    return paymentOptions;
}

const addPaymentOption = (option) => {
    if (!paymentOptions.includes(option)) {
        paymentOptions.push(option);
    }
}

const removePaymentOption = (option) => {
    paymentOptions = paymentOptions.filter(item => item !== option);
}

const paymentStore = {
    getPaymentOptions,
    addPaymentOption,
    removePaymentOption
};

export default paymentStore;