const formStore = {
    isIncomeMode: false,
    paymentMethodOptions: [
        { value: 'card', label: '카드' },
        { value: 'cash', label: '현금' },
        { value: 'transfer', label: '계좌이체' },
        { value: 'mobile', label: '모바일페이' },
    ],

    /* isIncomeMode 관련 Method */

    getIsIncomeMode() {
        return this.isIncomeMode;
    },

    toggleIncomeMode() {
        this.isIncomeMode = !this.isIncomeMode;
        this.notifyIncomeModeChanged();
        return this.isIncomeMode;
    },

    notifyIncomeModeChanged() {
        document.dispatchEvent(
            new CustomEvent('incomeModeChanged', {
                detail: { isIncomeMode: this.isIncomeMode },
            })
        );
    },

    /* paymentMethodOptions 관련 Method */

    addPaymentMethod(value) {
        this.paymentMethodOptions.push({ value, label: value });
        this.notifyPaymentMethodOptionsAdded();
    },

    deletePaymentMethod(value) {
        this.paymentMethodOptions = this.paymentMethodOptions.filter(
            (option) => option.value !== value
        );
        this.notifyPaymentMethodOptionsDeleted();
    },
};

export default formStore;
