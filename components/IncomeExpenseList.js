// 1. month가 바뀔 때마다 다른 지출 내역 보여주기
import dateState from '../states/DateState.js';
import { store } from '../store/store.js';

// let incomeExpenseData = {};

// // incomeExpenseData 불러 오기
// function loadIncomeExpenseData() {
//   fetch('./data/incomeExpenseData.json')
//     .then(response => response.json())
//     .then(data => {
//       incomeExpenseData = data;
//     })
//     .catch(error => {
//       console.error('데이터 로딩 실패:', error);
//       incomeExpenseData = {};
//     });
// }

export function renderIncomeExpenseList() {
  console.log('list');
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
  console.log(incomeExpenseData);

  // 현재 연월 가져오기
  const currentYear = dateState.getYear();
  const currentMonth = dateState.getMonth();

  // YYYY-MM 형식으로 키 생성
  const currentKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;

  // 키로 현재 연월 데이터 가져오기
  const currentMonthData = incomeExpenseData[currentKey] || [];
  console.log(currentMonthData);
  console.log(listContainer.firstChild);
  // 기존 내용 지우기 (DOM 조작 방식)
  while (listContainer.firstChild) {
    console.log('del');
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
    console.log('append');
    listContainer.appendChild(dateItem);
  });
}
