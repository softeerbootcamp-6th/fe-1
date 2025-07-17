import { formatMoney } from "../../utils/format.js";
import { dateStore, transactionStore } from "../../store/index.js";
import {
  getCalendarMatrix,
  getMonthlySummary,
  getDailySummary,
} from "./calendar.model.js";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function createCalendarHeader(WEEKDAYS) {
  return `
    <div class="calendar-header light-12">
      ${WEEKDAYS.map((day) => `<div>${day}</div>`).join("")}
    </div>
  `;
}

function createCalendarBody(weeks, year, month, transactionListByDate) {
  return `
    <div class="calendar-body">
      ${weeks
        .map(
          (week) => `
        <div class="calendar-row">
          ${week
            .map((day) =>
              createCalendarCell(day, year, month, transactionListByDate)
            )
            .join("")}
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

function createCalendarCell(day, year, month, transactionListByDate) {
  if (!day) return `<div class="calendar-cell empty"></div>`;

  const key = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;

  const { income, expense, total } = getDailySummary(
    transactionListByDate[key]
  );

  const createCalendarTotalIncomeAmount =
    income > 0
      ? `<div class="calendar-amount text-income">${formatMoney(income)}</div>`
      : ``;

  const createCalendarTotalExpenseAmount =
    expense < 0
      ? `<div class="calendar-amount text-expense">${formatMoney(
          expense
        )}</div>`
      : ``;

  const createCalendarTotalAmount =
    income || expense
      ? `<div class="calendar-amount">${formatMoney(total)}</div>`
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
  const { income, expense, total } = getMonthlySummary(year, month);
  return `
  <div class="calendar-info flex-between serif-14">
      <div class="flex-row gap-8">
          <div>총 수입 ${formatMoney(income)}원</div>
          <div>총 지출${formatMoney(expense)}원</div>
      </div>
      <div>총 ${formatMoney(total)} 원</div>
  </div>
  `;
}

export function renderCalendar(container) {
  container.innerHTML = `
    ${createCalendarHeader(WEEKDAYS)}
    ${createCalendarBody(
      getCalendarMatrix(dateStore.getYear(), dateStore.getMonth()),
      dateStore.getYear(),
      dateStore.getMonth(),
      transactionStore.getGroupedTransactionsByDate(
        dateStore.getYear(),
        dateStore.getMonth()
      )
    )}
  `;
}

export function renderCalendarInfo(container) {
  container.innerHTML = createCalendarMonthlyInfo(
    dateStore.getYear(),
    dateStore.getMonth()
  );
}
