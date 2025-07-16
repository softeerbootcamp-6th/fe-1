// 1. month가 바뀔 때마다 다른 지출 내역 보여주기
import { getYear, getMonth, subscribe } from '../store/dateStore.js';
import { store } from '../store/store.js';

export function renderIncomeExpenseList() {
  const incomeExpenseListContainer = document.createElement('div');
  incomeExpenseListContainer.className = 'income-expense-list-container';

  // 초기 렌더링
  renderListItem(incomeExpenseListContainer);

  // dateState 변경 시 재렌더링
  subscribe(() => {
    renderListItem(incomeExpenseListContainer);
  });

  return incomeExpenseListContainer;
}

export function renderListItem(listContainer) {
  // 데이터 로드
  const incomeExpenseData = store.incomeExpenseData;

  // 현재 연월 가져오기
  const currentYear = getYear();
  const currentMonth = getMonth();

  // YYYY-MM 형식으로 키 생성
  const currentKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;

  // 키로 현재 연월 데이터 가져오기
  const currentMonthData = incomeExpenseData[currentKey] || [];

  // TODO: 계산 로직 작성
  const monthlyNum = 0;
  const monthlyIncome = 0;
  const monthlyExpense = 0;

  // 기존 내용 지우기 (DOM 조작 방식)
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.firstChild);
  }

  const getMonthlyInfoHTML = (monthlyNum, monthlyIncome, monthlyExpense) => {
    return `
      <span> 전체내역 ${monthlyNum}건 </span>
      <div class="check-box-container">
        <div >
          <button>
            <img src="./assets/icons/checkbox.svg" />
          </button>
          <span>수입${monthlyIncome}</span>
        </div>
        <div>
          <button>
            <img src="./assets/icons/checkbox.svg" />
          </button>
          <span>지출${monthlyExpense}</span>
        </div>
      <div>
    
    
    `;
  };

  const getDailyInfoHTML = dateString => {
    const dateObj = new Date(dateString);
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    const dayStringList = ['월', '화', '수', '목', '금', '토', '일'];
    const dayStringIndex = dateObj.getDay();

    const dailyIncome = '';
    const dailyExpense = '';

    return `
    <div class="daily-info-container">
      <span>${month}월 ${date}일 ${dayStringList[dayStringIndex]}요일</span>
      <div>
        <span>수입 ${dailyIncome}</span>
        <span>지출 ${dailyExpense}</span>
      </div>
    </div>
    `;
  };

  const getListItemHTML = ({ money, description, payment, class_name }) => {
    return `
      <li class="list-item">
        <div class="class_name">${class_name}</div>
        <div class="description">${description}</div>
        <div class="payment">${payment}</div>
        <div class="money">${money}원</div>
      </li>
      `;
  };

  const monthlyInfoContainer = document.createElement('div');
  monthlyInfoContainer.className = 'monthly-info-container';
  monthlyInfoContainer.innerHTML = getMonthlyInfoHTML(
    monthlyNum,
    monthlyIncome,
    monthlyExpense
  );
  listContainer.appendChild(monthlyInfoContainer);

  // 월데이터 날짜 별로 화면에 뿌리기
  currentMonthData.forEach(dateData => {
    const dailyContainer = document.createElement('div');
    dailyContainer.className = 'daily-container';
    dailyContainer.innerHTML = getDailyInfoHTML(dateData.date);

    // 지출 내역 추가
    dateData.income_expense.forEach(item => {
      const listItem = document.createElement('div');
      listItem.className = 'list-item-container';
      listItem.innerHTML = getListItemHTML(item);
      dailyContainer.appendChild(listItem);
    });
    listContainer.appendChild(dailyContainer);
  });
}
