import { createElement, formatAmount } from '../../utils.js';
import { dailyData } from '../../store/daily.js';
import createDaliyList from './dailyList.js';
import dateData from '../../store/date.js';

export default function initalizeDailyList() {
    const today = new Date().toISOString().split('T')[0];
    const [year, month] = today.split('-');

    dailyViewChange(year, month);
}

export function dailyViewChange(year, month) {
    const $dailyRoot = document.querySelector('#daily-placeholder');
    $dailyRoot.innerHTML = '';
    dailyData.totalExpense = 0;
    dailyData.totalIncome = 0;

    let monthTotalIncome = 0;
    let monthTotalExpense = 0;
    let totalCount = 0;

    const $container = createElement('ol', { class: 'daily-list-wrapper' }, '');

    dailyData
        .getDailyByYearAndMonth(Number(year), Number(month))
        .forEach((list) => {
            list.items.forEach((item) => {
                totalCount += 1;
                if (item.amount > 0) {
                    monthTotalIncome += item.amount;
                } else {
                    monthTotalExpense += -item.amount;
                }
            });
            const $dailyList = createDaliyList(list);
            if ($dailyList) $container.appendChild($dailyList);
        });

    $dailyRoot.innerHTML = `
        <div class="total-header">
            <div class="lt-12">전체 내역    ${totalCount}건 </div>
            <div class="amount-wrapper">
                <div class="amount-container">    
                    <button id="filter-income" class="check-wrapper amount-btn-active"> 
                        <img width="12" height="12" src="/public/check.svg" /> 
                    </button>
                    <span class="lt-12">수입: ${formatAmount(
                        dailyData.totalIncome,
                    )}</span>
                </div>
                <div class="amount-container">
                    <button id="filter-expense" class="check-wrapper amount-btn-active"> 
                        <img width="12" height="12" src="/public/check.svg" /> 
                    </button>
                    <span class="lt-12">지출: ${formatAmount(
                        dailyData.totalExpense,
                    )}<span>
                </div>
            </div>
        </div>`;
    document.querySelector('#daily-placeholder').appendChild($container);

    $dailyRoot.querySelector('#filter-income').addEventListener('click', () => {
        dailyData.toggleIncomeFilter();
        dailyViewChange(dateData.year, dateData.month);

        const $income = document.getElementById('filter-income');
        const $expense = document.getElementById('filter-expense');

        if (dailyData.filteredIncome)
            $income.classList.remove('amount-btn-active');
        if (dailyData.filteredExpense)
            $expense.classList.remove('amount-btn-active');
    });
    $dailyRoot
        .querySelector('#filter-expense')
        .addEventListener('click', () => {
            dailyData.toggleExpenseFilter();
            dailyViewChange(dateData.year, dateData.month);

            const $income = document.getElementById('filter-income');
            const $expense = document.getElementById('filter-expense');

            console.log($expense);
            if (dailyData.filteredExpense)
                $expense.classList.remove('amount-btn-active');
            if (dailyData.filteredIncome)
                $income.classList.remove('amount-btn-active');
        });
}
