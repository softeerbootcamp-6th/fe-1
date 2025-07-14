import createDaily from '../components/dailyList/daily.js';
import createDaliyList from '../components/dailyList/dailyList.js';
import { formatDateToKorean } from '../utils.js';

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
        } catch (error) {}
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
        if (targetDateObj) {
            targetDateObj.items.push(newItems);
        } else {
            this.data = [{ date: date, items: [newItems] }, ...this.data];
        }
        updateDailyView(data);
    },
};

dailyData.init();

function updateDailyView(data) {
    const $dailyContainer = document.querySelector('.daily-list-wrapper'); // 여긴 ID 맞게 수정

    const { date } = data;
    const dateToKorean = formatDateToKorean(date);

    let $dateSection = [...$dailyContainer.children].find(
        (section) =>
            section.querySelector('.date-info')?.textContent === dateToKorean,
    );

    if ($dateSection) {
        const $newItem = createDaily(data);
        const $list = $dateSection.querySelector('.daliy-line-wrapper');
        $list.appendChild($newItem);
    } else {
        const listData = {
            date: data.date,
            items: [
                {
                    amount: data.amount,
                    category: data.category,
                    description: data.description,
                    payment: data.payment,
                },
            ],
        };
        const $newItemList = createDaliyList(listData);
        $dailyContainer.appendChild($newItemList);
    }
}
