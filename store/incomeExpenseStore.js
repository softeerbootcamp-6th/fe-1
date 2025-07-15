import dateStore from './dateStore.js';

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

const updateAllDummyData = (newData) => {
    const { year, month } = dateStore.getCurrentDate();
    console.log('Form submitted:', newData);
};

const incomeExpenseStore = {
    getAllDummyData,
    getCurrentIncomeExpenseList,
    get currentIncomeExpenseData() {
        return currentIncomeExpenseData; // Map currentIncomeExpenseData to currentIncomeExpenseList
    },
    updateAllDummyData
};

export default incomeExpenseStore;