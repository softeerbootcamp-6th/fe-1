export const dailyData = {
    data: [],
    async init() {
        await this.fetch();
    },
    async fetch() {
        try {
            const response = await fetch('/data/DailyInfo.json');
            if (!response.ok) throw new Error('데이터 로딩 실패');
            this.data = await response.json();
        } catch (error) {
            console.error('fetch error:', error);
        }
        console.log(this.data);
    },

    uploadDailyData(data) {
        const { amount, category, date, description, payment } = data;
        const targetDateObj = this.data.find((item) => item.date === date);
        const newItems = {
            category,
            description,
            payment,
            amount: Number(amount.replace(/,/g, '')),
            createAt: new Date().toISOString(),
        };
        console.log(newItems);
        if (targetDateObj) {
            targetDateObj.items.push(newItems);
        } else {
            this.data = [{ date: date, items: [newItems] }, ...this.data];
        }
        console.log(this.data);
    },
};

dailyData.init();
