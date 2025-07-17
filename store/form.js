import { getUUID } from '../lib/utils.js';

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

    addPaymentMethod(label) {
        const newPaymentMethod = {
            value: getUUID(),
            label: label,
        };
        this.paymentMethodOptions.push(newPaymentMethod);
        this.notifyPaymentMethodOptionsAdded(newPaymentMethod);
    },

    deletePaymentMethod(value) {
        this.paymentMethodOptions = this.paymentMethodOptions.filter(
            (option) => option.value !== value
        );
        this.notifyPaymentMethodOptionsDeleted();
    },

    notifyPaymentMethodOptionsAdded(newPaymentMethod) {
        document.dispatchEvent(
            new CustomEvent('paymentMethodOptionsAdded', {
                detail: { newPaymentMethod },
            })
        );
    },

    notifyPaymentMethodOptionsDeleted() {
        document.dispatchEvent(
            new CustomEvent('paymentMethodOptionsDeleted', {
                detail: { paymentMethodOptions: this.paymentMethodOptions },
            })
        );
    },
};

export default formStore;
