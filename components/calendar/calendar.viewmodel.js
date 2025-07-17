import {
  getTotalIncomeData,
  getTotalExpenseData,
} from "../../utils/transaction.js";
import { dateStore, transactionStore } from "../../store/index.js";
import {
  createCalendarHeader,
  createCalendarBody,
  createCalendarMonthlyInfo,
} from "./calendar.view.js";

export function getCalendarMatrix(year, month) {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  const firstDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const days = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ...Array(7 - ((daysInMonth + firstDayOfWeek) % 7 || 7)).fill(null),
  ];

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

export function getMonthlySummary(year, month) {
  const transactions = transactionStore.getTransactionsByYearMonth(year, month);
  const income = getTotalIncomeData(transactions).totalIncomeAmount;
  const expense = getTotalExpenseData(transactions).totalExpenseAmount;
  return { income, expense, total: income + expense };
}

export function getDailySummary(transactions) {
  if (!transactions) return { income: 0, expense: 0, total: 0 };

  const income = getTotalIncomeData(transactions).totalIncomeAmount;
  const expense = getTotalExpenseData(transactions).totalExpenseAmount;
  const total = income + expense;
  return { income, expense, total };
}

export function renderCalendar(container) {
  container.innerHTML = `
    ${createCalendarHeader()}
    ${createCalendarBody(
      getCalendarMatrix(dateStore.getYear(), dateStore.getMonth()),
      dateStore.getYear(),
      dateStore.getMonth(),
      transactionStore.getGroupedTransactionsByDate(
        dateStore.getYear(),
        dateStore.getMonth()
      ),
      getDailySummary
    )}
  `;
}

export function renderCalendarInfo(container) {
  container.innerHTML = createCalendarMonthlyInfo(
    getMonthlySummary(dateStore.getYear(), dateStore.getMonth())
  );
}
