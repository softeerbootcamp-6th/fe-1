const formData = {
    date: null,
    amount: null,
    description: null,
    payment: null,
    category: null,
    createDate: null,
    isValid: false,

    setDate(dateValue) {
        this.date = dateValue;
    },
    setAmount(amountValue) {
        this.amount = amountValue;
    },
    setDescription(desriptionValue) {
        this.description = desriptionValue;
    },
    setPayment(paymentValue) {
        this.payment = paymentValue;
    },
    setCategory(categoryValue) {
        this.category = categoryValue;
    },

    checkValid() {
        return this.date && this.amount && this.description && this.category;
    },
};

export default formData;
