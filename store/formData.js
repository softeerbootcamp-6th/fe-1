const formData = {
    date: null,
    amount: null,
    description: null,
    payment: null,
    category: null,
    createDate: null,
    sign: false,
    isValid: false,

    isValidListeners: new Set(),

    setSign(value) {
        this.sign = value;
    },

    setDate(dateValue) {
        this.date = dateValue;
        this.checkAndNotify();
    },
    setAmount(amountValue) {
        this.amount = amountValue;
        this.checkAndNotify();
    },
    setDescription(descriptionValue) {
        this.description = descriptionValue;
        this.checkAndNotify();
    },
    setPayment(paymentValue) {
        this.payment = paymentValue;
        this.checkAndNotify();
    },
    setCategory(categoryValue) {
        this.category = categoryValue;
        this.checkAndNotify();
    },

    checkValid() {
        this.isValid =
            this.date && this.amount && this.description && this.category;
    },

    subscribeIsValid(listener) {
        this.isValidListeners.add(listener);
        return () => this._isValidListeners.delete(listener);
    },

    checkAndNotify() {
        const prev = this.isValid;
        this.isValid = !!(
            this.date &&
            this.amount &&
            this.description &&
            this.category
        );

        if (prev != this.isValid)
            this.isValidListeners.forEach((fn) => fn(this.isValid, this));
    },
};

export default formData;
