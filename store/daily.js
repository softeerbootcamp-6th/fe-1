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
            if (!response.ok)
                throw new Error('수입/지출 내역 데이터 로딩 실패');
            this.data = await response.json();
        } catch (error) {
            console.error('데이터 로딩 중 오류 발생:', error?.message ?? error);
        }
    },

    uploadDailyData(data) {
        const { amount, category, date, description, payment, sign } = data;
        let calcAmount = 0;

        if (!sign) calcAmount = Math.abs(amount) * -1;
        const newItems = {
            id: crypto.randomUUID(),
            category,
            description,
            payment,
            amount: calcAmount,
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

    removeDailyData(id) {
        this.data = this.data.reduce((acc, day) => {
            const filteredItems = day.items.filter((item) => item.id !== id);
            if (filteredItems.length > 0) {
                acc.push({
                    ...day,
                    items: filteredItems,
                });
            }
            return acc;
        }, []);
    },

    findDailyDataById(id) {
        for (const day of this.data) {
            const item = day.items.find((item) => item.id === id);
            if (item) {
                return { date: day.date, items: item };
            }
        }
        return null;
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
