// 1. month가 바뀔 때마다 다른 지출 내역 보여주기
import dateState from "../states/DateState.js";

// data 서치 시 YYYY-MM 형식으로 검색
const incomeExpenseData = {
  '2025-08': [
    {
    date: '2025-08-01',
    income_expense: [
      { id: 1, type: '+', money: '1000', description: '하하하', payment: '현금', class: '문화여가'},
      { id: 2, type: '-', money: '500', description: '점심', payment: '카드', class: '식비'},
      { id: 3, type: '+', money: '2000', description: '월급', payment: '계좌이체', class: '수입'},
    ]}],
  '2025-07': [
    {date: '2025-07-01',
    income_expense: [
      { id: 1, type: '+', money: '1500', description: '영화', payment: '현금', class: '문화여가'},
      { id: 2, type: '-', money: '300', description: '커피', payment: '카드', class: '식비'},
      { id: 3, type: '+', money: '2500', description: '보너스', payment: '계좌이체', class: '수입'},
    ]},
    {date: '2025-07-02',
    income_expense: [
        { id: 4, type: '-', money: '800', description: '교통비', payment: '현금', class: '교통'},
        { id: 5, type: '+', money: '1200', description: '프리랜스 수입', payment: '계좌이체', class: '수입'},
    ]}
]
};

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