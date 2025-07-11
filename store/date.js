const dateData = {
    year: null,
    month: null,
    day: null,
    $container: null,

    initDateData() {
        const today = new Date();
        this.year = today.getFullYear();
        this.month = today.getMonth() + 1;
        this.day = today.getDate();
        this.$container = document.getElementById('location');
        changeDateView(this.year, this.month);
    },

    changeMonth(offset) {
        this.month += offset;

        if (this.month > 12) {
            this.month = 1;
            this.year += 1;
        } else if (this.month < 1) {
            this.month = 12;
            this.year -= 1;
        }

        changeDateView(this.year, this.month);
    },

    increaseMonth() {
        this.changeMonth(1);
    },

    decreaseMonth() {
        this.changeMonth(-1);
    },
};

function changeDateView(nowYear, nowMonth) {
    const $headerDateViewWrapper = document.getElementById('location');
    const children = $headerDateViewWrapper.children;

    const monthName = new Date(nowYear, nowMonth - 1).toLocaleString('en-US', {
        month: 'long',
    });
    children[0].textContent = nowYear;
    children[1].textContent = nowMonth;
    children[2].textContent = monthName;
}

export default dateData;
