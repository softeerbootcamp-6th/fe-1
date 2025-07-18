import { DAYS_OF_WEEK } from '../../lib/constant.js';
import {
    formatNumberWithCommas,
    getTotalAmount,
    groupByDate,
} from '../../lib/utils.js';
import dateStore from '../../store/date.js';
import paymentDataStore from '../../store/paymentData.js';

function createCalendarHeader() {
    const calendarHeader = document.createElement('thead');
    calendarHeader.className = 'calendar-header';
    return calendarHeader;
}

function createCalendarBody() {
    const calendarBody = document.createElement('tbody');
    calendarBody.className = 'calendar-body';
    return calendarBody;
}

function createCalendarRow() {
    const calendarRow = document.createElement('tr');
    return calendarRow;
}

function createCalendarCell({ date, isCurrentMonth, dayData = [] }) {
    const cell = document.createElement('td');
    cell.className = 'calendar-body-cell';

    if (!isCurrentMonth) {
        return cell;
    }

    const { totalIncome, totalExpense } = getTotalAmount(dayData);

    const cellContent = document.createElement('div');
    cellContent.className = 'calendar-body-cell-content';

    if (totalIncome > 0) {
        const incomeElement = document.createElement('span');
        incomeElement.className = 'income light-14';
        incomeElement.textContent = formatNumberWithCommas(totalIncome);
        cellContent.appendChild(incomeElement);
    }

    if (totalExpense > 0) {
        const expenseElement = document.createElement('span');
        expenseElement.className = 'expense light-14';
        expenseElement.textContent = `-${formatNumberWithCommas(totalExpense)}`;
        cellContent.appendChild(expenseElement);
    }

    if (totalIncome > 0 || totalExpense > 0) {
        const totalElement = document.createElement('span');
        totalElement.className = 'light-14';
        const netAmount = totalIncome - totalExpense;
        totalElement.textContent = formatNumberWithCommas(netAmount);
        cellContent.appendChild(totalElement);
    }

    const dateElement = document.createElement('span');
    dateElement.className = 'date-text serif-14';
    dateElement.textContent = date;
    cellContent.appendChild(dateElement);

    cell.appendChild(cellContent);
    return cell;
}

export default function createCalendar() {
    const calendarElement = document.createElement('table');
    calendarElement.className = 'calendar-table';

    //
    // Calendar Header 생성
    //

    const calendarHeader = createCalendarHeader();
    calendarElement.appendChild(calendarHeader);

    const calendarHeaderRow = createCalendarRow();
    DAYS_OF_WEEK.forEach((day) => {
        const headerCell = document.createElement('th');
        headerCell.className = 'calendar-header-cell light-12';
        headerCell.textContent = day;
        calendarHeaderRow.appendChild(headerCell);
    });

    calendarHeader.appendChild(calendarHeaderRow);

    //
    // Calendar Body 생성
    //

    const calendarBody = createCalendarBody();
    calendarElement.appendChild(calendarBody);

    function renderCalendarBody() {
        const year = dateStore.getYear();
        const month = dateStore.getMonth();
        const groupedMonthData = groupByDate(
            paymentDataStore.getPaymentData(year, month)
        );

        const dataByDate = {};
        groupedMonthData.forEach((group) => {
            const day = new Date(group.date).getDate();
            dataByDate[day] = group.records;
        });

        const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
        const lastDay = new Date(year, month, 0);
        const daysInMonth = lastDay.getDate();

        const calendarBody = calendarElement.querySelector('.calendar-body');
        calendarBody.innerHTML = '';

        let calendarRow = createCalendarRow();

        // 이전날 날짜 Cell 채우는 부분
        Array.from({ length: firstDayOfWeek }).forEach((_, i) => {
            const cell = createCalendarCell({ isCurrentMonth: false });
            calendarRow.appendChild(cell);
        });

        // 이번달 날짜 Cell 채우는 부분
        Array.from({ length: daysInMonth }).forEach((_, i) => {
            const date = i + 1;
            const dayData = dataByDate[date] || [];

            const cell = createCalendarCell({
                date,
                isCurrentMonth: true,
                dayData,
            });
            calendarRow.appendChild(cell);

            if (calendarRow.children.length === 7) {
                calendarBody.appendChild(calendarRow);
                calendarRow = createCalendarRow();
            }
        });

        // 다음달 날짜 Cell 채우는 부분
        if (calendarRow.children.length > 0) {
            Array.from({ length: 7 - calendarRow.children.length }).forEach(
                (_, i) => {
                    const cell = createCalendarCell({ isCurrentMonth: false });
                    calendarRow.appendChild(cell);
                }
            );
            calendarBody.appendChild(calendarRow);
        }
    }

    document.addEventListener('dateChanged', renderCalendarBody);
    document.addEventListener('paymentDataUpdated', renderCalendarBody);

    renderCalendarBody();

    return calendarElement;
}
