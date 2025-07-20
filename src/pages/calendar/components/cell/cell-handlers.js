import { formatDateString, isDateToday } from "../../../../utils/date-utils.js";
import { formatAmount } from "../../../../utils/format-utils.js";
import { getFilteredData } from "../../../../utils/data-utils.js";
import { dateStore } from "../../../../store/date-store.js";
import { transactionUtils } from "../../../../store/transaction-store.js";

// 달력을 렌더링하는 함수
export async function renderCalendarUI() {
  const calendarBody = document.getElementById("calendar-body");

  try {
    // store의 현재 데이터 사용
    const transactions = transactionUtils.getCurrentTransactions();

    const firstDay = new Date(
      dateStore.getState().currentYear,
      dateStore.getState().currentMonth - 1, // 1-12를 0-11로 변환
      1
    );
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay()); // 일요일부터 시작

    // 달력 초기화
    calendarBody.innerHTML = "";

    // 5주 * 7일 = 35개 셀 생성
    for (let i = 0; i < 35; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      const cell = createCalendarCell(
        currentDate,
        dateStore.getState().currentYear,
        dateStore.getState().currentMonth - 1, // 1-12를 0-11로 변환
        transactions
      );
      calendarBody.appendChild(cell);
    }
  } catch (error) {
    console.error("캘린더 렌더링 실패:", error);
  }
}

// 개별 달력 셀을 생성하는 함수
function createCalendarCell(date, year, month, transactions) {
  const cell = document.createElement("div");
  cell.className = "calendar-cell";

  const isCurrentMonth = date.getMonth() === month;
  const isToday = isDateToday(date);

  // 다른 달이면 색상 다르게 표시
  if (!isCurrentMonth) {
    cell.classList.add("other-month");
  }

  // 오늘 날짜면 색상 다르게 표시
  if (isToday) {
    cell.classList.add("today");
  }

  // 날짜 표시
  const dateEl = document.createElement("div");
  dateEl.className = "calendar-date";
  dateEl.textContent = date.getDate();
  cell.appendChild(dateEl);

  // 해당 날짜의 거래 내역 가져오기
  const dailyTransactions = getTransactionsForDate(date, transactions);

  // 일일 합계 표시 (거래가 있는 경우에만)
  if (dailyTransactions.length > 0) {
    const summaryEl = createDailySummary(dailyTransactions);
    cell.appendChild(summaryEl);
  }

  return cell;
}

// 일일 합계를 생성하는 함수
function createDailySummary(transactions) {
  const summaryEl = document.createElement("div");
  summaryEl.className = "daily-summary";

  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // 최종 합계 계산
  const balance = totalIncome - totalExpense;

  if (totalIncome > 0) {
    const incomeEl = document.createElement("div");
    incomeEl.className = "income";
    // formatAmount 함수 활용
    incomeEl.textContent = `+${formatAmount(totalIncome)}`;
    summaryEl.appendChild(incomeEl);
  }

  if (totalExpense > 0) {
    const expenseEl = document.createElement("div");
    expenseEl.className = "expense";
    // formatAmount 함수 활용
    expenseEl.textContent = `-${formatAmount(totalExpense)}`;
    summaryEl.appendChild(expenseEl);
  }

  // 최종 합계 표시
  const balanceEl = document.createElement("div");
  balanceEl.className = `balance ${balance >= 0 ? "positive" : "negative"}`;
  balanceEl.textContent = `${balance >= 0 ? "+" : "-"}${formatAmount(
    Math.abs(balance)
  )}`;
  summaryEl.appendChild(balanceEl);

  return summaryEl;
}

// 특정 날짜의 거래 내역을 가져오는 함수
function getTransactionsForDate(date, transactions) {
  const dateString = formatDateString(date);
  return transactions.filter((item) => item.date === dateString);
}
