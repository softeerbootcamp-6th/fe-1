import createDailyList from '../DailyInfo/List/index.js';
import createCheckbox from '../Checkbox/index.js';
import paymentDataStore from '../../store/paymentData.js';
import dateStore from '../../store/date.js';
import {
    formatNumberWithCommas,
    getTotalAmount,
    groupByDate,
    filterPaymentData,
} from '../../lib/utils.js';

const filterState = {
    income: true,
    expense: true,

    toggle(type) {
        this[type] = !this[type];
    },
};

export default function createMonthlyInfo() {
    const monthlyInfo = document.createElement('div');
    monthlyInfo.className = 'monthly-info-container';
    monthlyInfo.innerHTML = `
        <div class="monthly-info-container">
            <div class="monthly-info">
                <div class="item-counter">
                    <span class="light-12">전체 내역</span>
                    <span class="light-12 item-counter-text">${paymentDataStore.getPaymentDataCount()}건</span>
                </div>
                <div class="checkbox-buttons">
                </div>
            </div>
            <ol class="daily-list-container">
            </ol>
        </div>
    `;

    const checkboxButtonsContainer =
        monthlyInfo.querySelector('.checkbox-buttons');
    const dailyListContainer = monthlyInfo.querySelector(
        '.daily-list-container'
    );
    const itemCounterTextElement =
        monthlyInfo.querySelector('.item-counter-text');

    const incomeCheckbox = createCheckbox({
        id: 'income-checkbox',
        checked: filterState.income,
        onClick: (checked) => {
            filterState.income = checked;
            renderDailyLists();
        },
        children: `
            <span class="light-12"> 수입 </span>
            <span class="light-12 checkbox-value">0</span>
        `,
    });

    const expenseCheckbox = createCheckbox({
        id: 'expense-checkbox',
        checked: filterState.expense,
        onClick: (checked) => {
            filterState.expense = checked;
            renderDailyLists();
        },
        children: `
            <span class="light-12"> 지출 </span>
            <span class="light-12 checkbox-value">0</span>
        `,
    });

    checkboxButtonsContainer.appendChild(incomeCheckbox);
    checkboxButtonsContainer.appendChild(expenseCheckbox);

    const renderDailyLists = () => {
        dailyListContainer.innerHTML = '';
        const year = dateStore.getYear();
        const month = dateStore.getMonth();

        const paymentData = filterPaymentData({
            data: paymentDataStore.getPaymentData(year, month),
            income: filterState.income,
            expense: filterState.expense,
        });

        const groupedData = groupByDate(paymentData);
        groupedData.forEach((data) => {
            const dailyList = createDailyList(data);
            dailyListContainer.appendChild(dailyList);
        });

        itemCounterTextElement.textContent = `${paymentData.length}건`;

        const { totalIncome, totalExpense } = getTotalAmount(paymentData);
        incomeCheckbox.querySelector('.checkbox-value').textContent =
            formatNumberWithCommas(totalIncome);
        expenseCheckbox.querySelector('.checkbox-value').textContent =
            formatNumberWithCommas(totalExpense);
    };

    renderDailyLists();

    document.addEventListener('paymentDataUpdated', renderDailyLists);
    document.addEventListener('dateChanged', renderDailyLists);

    return monthlyInfo;
}
