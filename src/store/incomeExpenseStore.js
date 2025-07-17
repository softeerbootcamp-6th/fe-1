import dateStore from './dateStore.js';
import { findAfterIndexArray } from '../utils/findIndexArray.js';

let allDummyData = [];
let currentIncomeExpenseData = null;

const getAllDummyData = async () => {
    try {
        const response = await fetch('../../../mock/DummyData.json');
        const data = await response.json();
        allDummyData = data;
        getCurrentIncomeExpenseList();
    } catch (error) {
        alert('데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.');
    }
};

const getCurrentIncomeExpenseList = () => {
    const { year, month } = dateStore.getCurrentDate();
    currentIncomeExpenseData = allDummyData.find(item => item.year === year && item.month === month) || null;
    console.log('Current Income/Expense List:', currentIncomeExpenseData);
};

const createBlock = (data) => ({
    blockId: Math.floor(Math.random() * 1000000),
    type: data.amount > 0 ? 'income' : 'expense',
    ...data,
});

const createDailyEntry = (date, data) => ({
    dailyListId: Math.floor(Math.random() * 1000000),
    date,
    totalIncome: data.amount > 0 ? data.amount : 0,
    totalExpenses: data.amount < 0 ? -data.amount : 0,
    list: [createBlock(data)],
});

const updateAllDummyData = (newData) => {
    const [year, month] = newData.date.split('-').map(Number);
    const monthIndex = allDummyData.findIndex(item => item.year === year && item.month === month);
    const amount = newData.amount;

    if (monthIndex !== -1) {
        const monthData = allDummyData[monthIndex];
        const dailyList = monthData.dailyList;
        const dateIndex = dailyList.findIndex(item => item.date === newData.date);

        if (dateIndex !== -1) {
            // 기존 날짜 데이터에 추가
            const entry = dailyList[dateIndex];
            if (amount > 0) entry.totalIncome += amount;
            else entry.totalExpenses += -amount;
            entry.list.push(createBlock(newData));
        } else {
            // 날짜 데이터 없음: 위치 찾아 삽입 또는 맨 뒤에 추가
            const newEntry = createDailyEntry(newData.date, newData);
            const insertIndex = findAfterIndexArray(dailyList, 'date', newData.date);
            if (insertIndex !== -1) {
                dailyList.splice(insertIndex, 0, newEntry);
            } else {
                dailyList.push(newEntry);
            }
        }
    } else {
        // 월 데이터 없음 → 새로 생성 후 삽입
        const newMonth = {
            year,
            month,
            dailyList: [createDailyEntry(newData.date, newData)],
        };
        const insertIndex = findAfterIndexArray(allDummyData, 'month', month);
        if (insertIndex !== -1) {
            allDummyData.splice(insertIndex, 0, newMonth);
        } else {
            allDummyData.push(newMonth);
        }
    }
};

const deleteDailyListBlock = (blockData) => {
    if (!currentIncomeExpenseData) return;

    const listIndex = currentIncomeExpenseData.dailyList.findIndex(
        item => item.date === blockData.date
    );
    if (listIndex === -1) {
        alert('해당 날짜의 데이터가 없습니다.');
        return;
    }

    const dailyList = currentIncomeExpenseData.dailyList[listIndex].list;
    const blockIndex = dailyList.findIndex(item => item.blockId === blockData.blockId);
    if (blockIndex === -1) {
        alert('해당 블록이 없습니다.');
        return;
    }

    const isOnlyOneBlock = dailyList.length === 1;

    if (isOnlyOneBlock) {
        currentIncomeExpenseData.dailyList.splice(listIndex, 1);
    } else {
        dailyList.splice(blockIndex, 1);

        if (blockData.amount > 0) {
            currentIncomeExpenseData.dailyList[listIndex].totalIncome -= blockData.amount;
        } else {
            currentIncomeExpenseData.dailyList[listIndex].totalExpenses += -blockData.amount;
        }
    }
};

const updateExistingData = (data, blockId) => {
    console.log('Updating existing data:', data, 'for blockId:', blockId);

    // blockId를 가진 블록을 찾습니다.
    const listIndex = currentIncomeExpenseData.dailyList.findIndex(
        item => item.date === data.date
    );
    if (listIndex === -1) {
        alert('해당 날짜의 데이터가 없습니다.');
        return;
    }
    const dailyList = currentIncomeExpenseData.dailyList[listIndex].list;
    const blockIndex = dailyList.findIndex(item => item.blockId === blockId);
    if (blockIndex === -1) {
        alert('해당 블록이 없습니다.');
        return;
    }
    // 기존 블록 데이터를 업데이트합니다.
    const existingBlock = dailyList[blockIndex];
    const oldAmount = existingBlock.amount;

    existingBlock.amount = data.amount;
    existingBlock.description = data.description;
    existingBlock.method = data.method;
    existingBlock.category = data.category;
    existingBlock.type = data.amount > 0 ? 'income' : 'expense';

    // 금액이 변경되었다면
    if (oldAmount !== data.amount) {
        if (data.amount > 0) {
            currentIncomeExpenseData.dailyList[listIndex].totalIncome += data.amount - oldAmount;
            console.log('Income updated:', currentIncomeExpenseData.dailyList[listIndex].totalIncome);
        } else {
            currentIncomeExpenseData.dailyList[listIndex].totalExpenses += -data.amount - (-oldAmount);
            console.log('Expenses updated:', currentIncomeExpenseData.dailyList[listIndex].totalExpenses);
        }
    }
    console.log('Updated existing data:', existingBlock);
    // 변경된 데이터를 저장합니다.
    allDummyData = allDummyData.map(item => {
        if (item.year === currentIncomeExpenseData.year && item.month === currentIncomeExpenseData.month) {
            return currentIncomeExpenseData;
        }
        return item;
    });
}


const incomeExpenseStore = {
    getAllDummyData,
    getCurrentIncomeExpenseList,
    get currentIncomeExpenseData() {
        return currentIncomeExpenseData; // Map currentIncomeExpenseData to currentIncomeExpenseList
    },
    updateAllDummyData,
    deleteDailyListBlock,
    updateExistingData,
};

export default incomeExpenseStore;