import createDaliyList from '../components/dailyList/dailyList';
import { dailyData } from '../store/daily';
import { createElement, formatAmount } from '../utils';
import formData from '../store/formData.js';
import dateData from '../store/date.js';
import { bindInputValue } from '../viewHandler/inputView.js';

function createDailyHeader(totalCount, totalIncome, totalExpense) {
    return `
        <div class="total-header">
            <div class="lt-12">전체 내역    ${totalCount}건 </div>
            <div class="amount-wrapper">
                <div class="amount-container">    
                    <button id="filter-income" class="check-wrapper amount-btn-active"> 
                        <img width="12" height="12" src="/public/check.svg" /> 
                    </button>
                    <span class="lt-12">수입: ${formatAmount(
                        totalIncome,
                    )}</span>
                </div>
                <div class="amount-container">
                    <button id="filter-expense" class="check-wrapper amount-btn-active"> 
                        <img width="12" height="12" src="/public/check.svg" /> 
                    </button>
                    <span class="lt-12">지출: ${formatAmount(
                        totalExpense,
                    )}<span>
                </div>
            </div>
        </div>`;
}

export function dailyViewChange(year, month) {
    const $dailyRoot = document.querySelector('#daily-placeholder');
    $dailyRoot.innerHTML = '';
    dailyData.totalExpense = 0;
    dailyData.totalIncome = 0;
    dailyData.totalCount = 0;

    const $container = createElement('ol', { class: 'daily-list-wrapper' }, '');

    dailyData
        .getDailyByYearAndMonth(Number(year), Number(month))
        .forEach((list) => {
            const $dailyList = createDaliyList(list);
            if ($dailyList) $container.appendChild($dailyList);
        });

    $dailyRoot.innerHTML = createDailyHeader(
        dailyData.totalCount,
        dailyData.totalIncome,
        dailyData.totalExpense,
    );
    $dailyRoot.appendChild($container);

    addFilterEventListener('filter-income', $dailyRoot, () =>
        dailyData.toggleIncomeFilter(),
    );
    addFilterEventListener('filter-expense', $dailyRoot, () =>
        dailyData.toggleExpenseFilter(),
    );

    bindListClickEvent($container);
}

function addFilterEventListener(targetId, $rootElement, filterFn) {
    $rootElement.querySelector(`#${targetId}`).addEventListener('click', () => {
        filterFn();
        dailyViewChange(dateData.year, dateData.month);

        const $income = document.getElementById('filter-income');
        const $expense = document.getElementById('filter-expense');

        if (dailyData.filteredIncome)
            $income.classList.remove('amount-btn-active');
        if (dailyData.filteredExpense)
            $expense.classList.remove('amount-btn-active');
    });
}

function bindListClickEvent($rootElement) {
    $rootElement.addEventListener('click', (e) => {
        const $dailyLine = e.target.closest('.daily-line');

        if (!$dailyLine) return;

        const $deleteBtn = e.target.closest('.daily-delete-btn');
        const seletedId = $dailyLine.getAttribute('id');

        if ($deleteBtn) {
            dailyData.removeDailyData(seletedId);
            dailyViewChange(dateData.year, dateData.month);
            return;
        }

        if ($dailyLine.classList.contains('selected')) {
            $dailyLine.classList.remove('selected');
            formData.init();
            bindInputValue(formData);
            return;
        }

        $dailyLine.classList.add('selected');
        formData.setEdit(true);
        formData.setDailyId(seletedId);

        const { date, items } = dailyData.findDailyDataById(seletedId);
        items.amount > 0 ? (items.sign = true) : (items.sign = false);

        formData.setFormData(date, items);
        bindInputValue(formData);
    });
}
