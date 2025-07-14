const formStore = {
    isIncomeMode: false,

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
};

export default formStore;
