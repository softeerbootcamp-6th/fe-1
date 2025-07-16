import { totalIncomeData, totalExpenseData } from "../utils/transaction.js";
import { transactionStore } from "../store/index.js";
import { formatMoney } from "../utils/format.js";
import { dateStore } from "../store/index.js";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function createCalendarCell(day, year, month, transactionListByDate) {
  if (!day) return `<div class="calendar-cell empty"></div>`;

  const key = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;

  const transactions = transactionListByDate[key] || [];

  const { totalIncomeAmount } = totalIncomeData(transactions);
  const { totalExpenseAmount } = totalExpenseData(transactions);

  const createCalendarTotalIncomeAmount =
    totalIncomeAmount > 0
      ? `<div class="calendar-amount text-income">${formatMoney(
          totalIncomeAmount
        )}</div>`
      : ``;

  const createCalendarTotalExpenseAmount =
    totalExpenseAmount < 0
      ? `<div class="calendar-amount text-expense">${formatMoney(
          totalExpenseAmount
        )}</div>`
      : ``;

  const createCalendarTotalAmount =
    totalIncomeAmount + totalExpenseAmount > 0
      ? `<div class="calendar-amount">${formatMoney(
          totalIncomeAmount + totalExpenseAmount
        )}</div>`
      : ``;

  return `
      <div class="calendar-cell" data-date="${day}">
        <div class="calendar-cell-details light-14">
            ${createCalendarTotalIncomeAmount}
            ${createCalendarTotalExpenseAmount}
            ${createCalendarTotalAmount}
        </div>
        <div class="calendar-date serif-14">${day}</div>
      </div>
    `;
}

function createCalendarMonthlyInfo(year, month) {
  const { totalIncomeAmount } = totalIncomeData(
    transactionStore.getTransactionsByYearMonth(year, month)
  );
  const { totalExpenseAmount } = totalExpenseData(
    transactionStore.getTransactionsByYearMonth(year, month)
  );
  return `
  <div class="calendar-info flex-between serif-14">
      <div class="flex-row gap-8">
          <div>총 수입 ${formatMoney(totalIncomeAmount)}원</div>
          <div>총 지출${formatMoney(totalExpenseAmount)}원</div>
      </div>
      <div>총 ${formatMoney(totalIncomeAmount + totalExpenseAmount)} 원</div>
  </div>
  `;
}

function getCalendarMatrix(year, month) {
  // month: 1~12
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  const firstDayOfWeek = firstDay.getDay(); // 첫째 날이 시작되는 요일 인덱스
  const daysInMonth = lastDay.getDate(); // 이번 달의 마지막 날의 날짜

  const days = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // 날짜가 7로 나누어 떨어지지 않으면 나머지 날짜를 추가
  const remainder = days.length % 7;
  if (remainder !== 0) {
    days.push(...Array(7 - remainder).fill(null));
  }

  // 2차원 배열 생성
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

export function createCalendar(year, month) {
  const transactionListByDate = transactionStore.getGroupedTransactionsByDate(
    year,
    month
  );

  const weeks = getCalendarMatrix(year, month);

  const calendarHeader = `
    <div class="calendar-header light-12">
        ${WEEKDAYS.reduce((acc, day) => acc + `<div>${day}</div>`, "")}
    </div>
    `;

  const calendarBody = `
    <div class="calendar-body">
      ${weeks.reduce(
        (acc, week) =>
          acc +
          `<div class="calendar-row">
            ${week.reduce(
              (weekAcc, day) =>
                weekAcc +
                createCalendarCell(day, year, month, transactionListByDate),
              ""
            )}
          </div>`,
        ""
      )}
    </div>
  `;

  return calendarHeader + calendarBody;
}

export function renderCalendar(container) {
  container.innerHTML = createCalendar(
    dateStore.getYear(),
    dateStore.getMonth()
  );
}

export function renderCalendarInfo(container) {
  container.innerHTML = createCalendarMonthlyInfo(
    dateStore.getYear(),
    dateStore.getMonth()
  );
}
