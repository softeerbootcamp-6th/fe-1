const payment = {
    data: ['현금', '신용카드'],
    addPayment(value) {
        this.data.push(value);
    },
    filterByValue(value) {
        this.data = this.data.filter((item) => item !== value);
        return this.data;
    },
};

export default payment;
