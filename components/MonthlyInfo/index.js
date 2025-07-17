import createDailyList from '../DailyInfo/List/index.js';
import paymentDataStore from '../../store/paymentData.js';
import dateStore from '../../store/date.js';

const filterState = {
    income: true,
    expense: true,

    toggle(type) {
        this[type] = !this[type];
    },
};

const CheckboxIcon = {
    checkbox: {
        icon: '/assets/icons/checkbox.svg',
        alt: 'Checkbox Icon',
    },
    uncheckbox: {
        icon: '/assets/icons/uncheckbox.svg',
        alt: 'Uncheckbox Icon',
    },
};

export default function createMonthlyInfo() {
    const monthlyInfo = document.createElement('div');
    monthlyInfo.className = 'main-container';
    monthlyInfo.innerHTML = `
        <div class="main-container">
            <div class="monthly-info">
                <div class="item-counter">
                    <span class="light-12">전체 내역</span>
                    <span class="light-12 item-counter-text">${paymentDataStore.getPaymentDataCount()}건</span>
                </div>
                <div class="checkbox-buttons">
                    <div class="checkbox-button-container">
                        <button class="checkbox-button" id="income-checkbox">
                            <img
                                src="${CheckboxIcon.checkbox.icon}"
                                alt="${CheckboxIcon.checkbox.alt}"
                                width="16"
                                height="16"
                            />
                        </button>
                        <span class="light-12"> 수입 </span>
                    </div>
                    <div class="checkbox-button-container">
                        <button class="checkbox-button" id="expense-checkbox">
                            <img
                                src="${CheckboxIcon.checkbox.icon}"
                                alt="${CheckboxIcon.checkbox.alt}"
                                width="16"
                                height="16"
                            />
                        </button>
                        <span class="light-12"> 지출 </span>
                    </div>
                </div>
            </div>
            <ol class="daily-list-container">
            </ol>
        </div>
    `;

    const dailyListContainer = monthlyInfo.querySelector(
        '.daily-list-container'
    );
    const itemCounterTextElement =
        monthlyInfo.querySelector('.item-counter-text');

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
    };

    renderDailyLists();

    document.addEventListener('paymentDataUpdated', renderDailyLists);
    document.addEventListener('dateChanged', renderDailyLists);

    const incomeCheckbox = monthlyInfo.querySelector('#income-checkbox');
    const expenseCheckbox = monthlyInfo.querySelector('#expense-checkbox');
    incomeCheckbox.addEventListener('click', () => {
        filterState.toggle('income');
        incomeCheckbox.querySelector('img').src = filterState.income
            ? CheckboxIcon.checkbox.icon
            : CheckboxIcon.uncheckbox.icon;
        renderDailyLists();
    });
    expenseCheckbox.addEventListener('click', () => {
        filterState.toggle('expense');
        expenseCheckbox.querySelector('img').src = filterState.expense
            ? CheckboxIcon.checkbox.icon
            : CheckboxIcon.uncheckbox.icon;
        renderDailyLists();
    });

    return monthlyInfo;
}

function groupByDate(data) {
    const grouped = data.reduce((acc, item) => {
        const date = item.paidAt.split('T')[0];

        if (!acc[date]) {
            acc[date] = {
                date: date,
                records: [],
            };
        }

        acc[date].records.push(item);
        return acc;
    }, {});

    return Object.values(grouped).sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );
}

function filterPaymentData({ data, income, expense }) {
    if (income && expense) {
        return data;
    }

    if (income) {
        return data.filter((item) => item.amount > 0);
    }

    if (expense) {
        return data.filter((item) => item.amount < 0);
    }
    return [];
}
