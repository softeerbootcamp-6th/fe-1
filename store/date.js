const dateStore = {
    year: 2025,
    month: 1,
    
    getDate() {
        return new Date(this.year, this.month - 1);
    },

    getYear() {
        return this.year;
    },

    getMonth() {
        return this.month;
    },

    increaseMonth() {
        let newYear = this.year;
        let newMonth = this.month + 1;

        if (newMonth >= 13) {
            newMonth = 1;
            newYear += 1;
        }

        this.year = newYear;
        this.month = newMonth;
        this.notifyDateChanged();
    },

    decreaseMonth() {
        let newYear = this.year;
        let newMonth = this.month - 1;

        if (newMonth <= 0) {
            newMonth = 12;
            newYear -= 1;
        }

        this.year = newYear;
        this.month = newMonth;
        this.notifyDateChanged();
    },

    notifyDateChanged() {
        document.dispatchEvent(
            new CustomEvent('dateChanged', {
                detail: { year: this.year, month: this.month },
            })
        );
    },
};

export default dateStore;
