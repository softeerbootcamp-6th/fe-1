export const dailyData = {
    data: [],
    filteredIncome: false,
    filteredExpense: false,
    totalIncome: 0,
    totalExpense: 0,
    async init() {
        await this.fetch();
    },
    async fetch() {
        try {
            const response = await fetch('/data/DailyInfo.json');
            if (!response.ok) throw new Error('데이터 로딩 실패');
            this.data = await response.json();
        } catch (error) {}
    },

    uploadDailyData(data) {
        const { amount, category, date, description, payment, sign } = data;
        let numberAmount = Number(amount.replace(/,/g, ''));
        if (!sign) numberAmount *= -1;
        const newItems = {
            category,
            description,
            payment,
            amount: numberAmount,
            createAt: new Date().toISOString(),
        };

        const targetDateObj = this.data.find((item) => item.date === date);
        if (targetDateObj) {
            targetDateObj.items.push(newItems);
        } else {
            const newGroup = { date, items: [newItems] };
            const index = this.data.findIndex(
                (item) => new Date(date) < new Date(item.date),
            );
            if (index === -1) {
                this.data.push(newGroup);
            } else {
                this.data.splice(index, 0, newGroup);
            }
        }
    },

    getDailyByYearAndMonth(year, month) {
        return this.data.filter((item) => {
            const date = new Date(item.date);
            return date.getMonth() + 1 === month && date.getFullYear() === year;
        });
    },

    toggleIncomeFilter() {
        this.filteredIncome = !this.filteredIncome;
    },

    toggleExpenseFilter() {
        this.filteredExpense = !this.filteredExpense;
    },
};
