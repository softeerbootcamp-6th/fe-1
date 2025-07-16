import monthState from "../../stores/subjects/MonthState.js";

export class CalandarView {
  constructor() {
    this.$calendarContainer = document.querySelector(".calendar-container");
    this.$calendarFooter = document.querySelector(".calendar-footer");
  }

  render({ dailyTransactions: transactions, totalIncome, totalExpense }) {
    const { year, month } = monthState.getMonthInfo();
    // 기존 내용 초기화
    this.$calendarContainer.innerHTML = "";
    this.$calendarFooter.innerHTML = "";

    // 캘린더 그리드 생성
    const calendarGrid = document.createElement("div");
    calendarGrid.className = "calendar-grid";

    // 요일 헤더 생성
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    daysOfWeek.forEach((day) => {
      const dayHeader = document.createElement("div");
      dayHeader.className = "calendar-day-header";
      dayHeader.textContent = day;
      calendarGrid.appendChild(dayHeader);
    });

    // 해당 월의 첫 번째 날과 마지막 날 계산
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const firstDayOfWeek = firstDay.getDay(); // 0: 일요일, 6: 토요일
    const lastDayOfWeek = lastDay.getDay(); // 0: 일요일, 6: 토요일
    const daysInMonth = lastDay.getDate();

    // 이전 달의 빈 셀들
    for (let i = 0; i < firstDayOfWeek; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.className = "calendar-day empty";
      calendarGrid.appendChild(emptyCell);
    }

    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      const dayTransactions = transactions[`${year}-${month}-${day}`] || {
        income: 0,
        expense: 0,
      };
      const income = dayTransactions.income;
      const expense = dayTransactions.expense;
      const total = income - expense;
      const dayTemplate = `
              <div class="calendar-day__money font-light-14">
                  ${
                    income
                      ? `<span class="calendar-day__money-income">${income.toLocaleString()}</span>`
                      : ""
                  }
                  ${
                    expense
                      ? `<span class="calendar-day__money-expense">-${expense.toLocaleString()}</span>`
                      : ""
                  }
                  ${
                    total
                      ? `<span class="calendar-day__money-total">${total.toLocaleString()}</span>`
                      : ""
                  }
              </div>
              <div class="calendar-day__date font-serif-14">${day}</div>
          `;
      const dayCell = document.createElement("div");
      dayCell.className = "calendar-day";
      dayCell.innerHTML = dayTemplate;
      calendarGrid.appendChild(dayCell);
    }

    // 다음 달의 빈 셀들
    for (let i = lastDayOfWeek + 1; i < 7; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.className = "calendar-day empty";
      calendarGrid.appendChild(emptyCell);
    }

    const calendarFooterTemplate = `
      <div class="font-serif-14 footer__item">
        <span class="calendar-footer__total-title">총 수입</span>
        <span class="calendar-footer__total-title">${totalIncome.toLocaleString()}원</span>
        <span class="calendar-footer__total-title">총 지출</span>
        <span class="calendar-footer__total-title">${totalExpense.toLocaleString()}원</span>
      </div>
      <div class="font-serif-14 footer__item">
        <span class="calendar-footer__total-title">총합</span>
        <span class="calendar-footer__total-title">${(
          totalIncome - totalExpense
        ).toLocaleString()}원</span>
      </div>
    `;

    this.$calendarContainer.appendChild(calendarGrid);
    this.$calendarFooter.innerHTML = calendarFooterTemplate;
  }
}
