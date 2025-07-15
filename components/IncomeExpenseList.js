// 1. month가 바뀔 때마다 다른 지출 내역 보여주기
import dateState from '../states/DateState.js';
import incomeExpenseData from '../data/incomeExpenseData.js';

export function renderIncomeExpenseList() {
  const incomeExpenseList = document.createElement('div');
  incomeExpenseList.className = 'income-expense-list';

  // 초기 렌더링
  renderList(incomeExpenseList);

  // dateState 변경 시 재렌더링
  dateState.subscribe(() => {
    renderList(incomeExpenseList);
  });

  return incomeExpenseList;
}

function renderList(listContainer) {
  // 현재 연월 가져오기
  const currentYear = dateState.getYear();
  const currentMonth = dateState.getMonth();

  // YYYY-MM 형식으로 키 생성
  const currentKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;

  // 키로 현재 연월 데이터 가져오기
  const currentMonthData = incomeExpenseData[currentKey] || [];

  // 기존 내용 지우기 (DOM 조작 방식)
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.firstChild);
  }

  // 월데이터 날짜 별로 화면에 뿌리기
  currentMonthData.forEach(dateData => {
    const dateItem = document.createElement('div');
    dateItem.className = 'date-item';
    dateItem.textContent = dateData.date;

    // 지출 내역 추가
    dateData.income_expense.forEach(item => {
      const incomeExpenseItem = document.createElement('div');
      incomeExpenseItem.className = 'income-expense-item';
      incomeExpenseItem.innerHTML = `
                <span class="type">${item.type}</span>
                <span class="money">${item.money}원</span>
                <span class="description">${item.description}</span>
                <span class="payment">${item.payment}</span>
                <span class="class">${item.class}</span>
            `;
      dateItem.appendChild(incomeExpenseItem);
    });

    listContainer.appendChild(dateItem);
  });
}
