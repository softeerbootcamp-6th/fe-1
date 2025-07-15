// 1. month가 바뀔 때마다 다른 지출 내역 보여주기
import dateState from '../states/DateState.js';
import { store } from '../store/store.js';

export function renderIncomeExpenseList() {
  const incomeExpenseListContainer = document.createElement('div');
  incomeExpenseListContainer.className = 'income-expense-list-container';
  // const form = document.querySelector('form');
  // const addButton = form.querySelector('.add-button');

  // 초기 렌더링
  renderListItem(incomeExpenseListContainer);

  // dateState 변경 시 재렌더링
  dateState.subscribe(() => {
    renderListItem(incomeExpenseListContainer);
  });

  // addButton.addEventListener('click', () => {
  //   renderListItem(incomeExpenseListContainer);
  // });

  return incomeExpenseListContainer;
}

export function renderListItem(listContainer) {
  // 데이터 로드
  const incomeExpenseData = store.incomeExpenseData;

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

  const getListItemHTML = ({
    type,
    money,
    description,
    payment,
    class_name,
  }) => {
    return `
                <span class="type">${type}</span>
                <span class="money">${money}원</span>
                <span class="description">${description}</span>
                <span class="payment">${payment}</span>
                <span class="class">${class_name}</span>
            `;
  };

  // 월데이터 날짜 별로 화면에 뿌리기
  currentMonthData.forEach(dateData => {
    const dateItem = document.createElement('div');
    dateItem.className = 'date-item';
    dateItem.textContent = dateData.date;

    // 지출 내역 추가
    dateData.income_expense.forEach(item => {
      const listItem = document.createElement('div');
      listItem.className = 'income-expense-item';
      listItem.innerHTML = getListItemHTML(item);
      dateItem.appendChild(listItem);
    });
    listContainer.appendChild(dateItem);
  });
}
