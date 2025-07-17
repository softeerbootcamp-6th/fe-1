import { loadCSS } from '../../utils/cssLoader.js';
import InputBar from './components/InputBar.js';
import DailyList from './components/DailyList.js';
import dataStore from '../../store/dateStore.js';
import { calculateTotal, calculateFieldLength } from '../../utils/calculate.js';
import incomeExpenseStore from '../../store/incomeExpenseStore.js';
import { formatAmount } from '../../utils/format.js';

let inputBar; // 상단에 선언

function MainPage() {
    // MainPage CSS 로드
    loadCSS('./src/pages/MainPage/MainPage.css', 'mainpage-css');

    if (!inputBar) inputBar = InputBar();

    let total = 0;
    let totalIncome = 0;
    let totalExpenses = 0;
    const dailyListArray = [];

    let incomeFilterOn = true;
    let expenseFilterOn = true;

    // 수입과 지출의 총액 계산
    const calculate = () => {
        totalIncome = calculateTotal(dailyListArray, 'totalIncome');
        totalExpenses = calculateTotal(dailyListArray, 'totalExpenses');
        total = calculateFieldLength(dailyListArray, 'list');
    };

    // dailyListArray로 파라미터 넘겨 element 넣기
    const updateDailyListContainer = () => {
        const dailyListContainer = document.querySelector('.daily-list-container');

        const filteredDailyListArray = dailyListArray.filter(item => {
            if (item.totalIncome > 0 && !incomeFilterOn) return false;
            if (item.totalExpenses > 0 && !expenseFilterOn) return false;
            return true;
        });

        if (filteredDailyListArray.length > 0) {
            dailyListContainer.innerHTML = filteredDailyListArray.map((item) => {
                const dailyList = DailyList({ data: item, inputBar, incomeFilterOn, expenseFilterOn });
                return dailyList.element;
            }).join('');
        } else {
            dailyListContainer.innerHTML = '';
        }
    };

    const updateTotalsDisplay = () => {
        const incomeAmountElement = document.querySelector('.income-amount');
        const expenseAmountElement = document.querySelector('.expense-amount');
        const totalCountElement = document.querySelector('.total-count');

        incomeAmountElement.textContent = `${formatAmount(totalIncome)}원`;
        expenseAmountElement.textContent = `${formatAmount(totalExpenses)}원`;
        totalCountElement.textContent = `${total}건`;

    };

    const handleFilterToggle = (type) => {
        if (type === 'income') {
            incomeFilterOn = !incomeFilterOn;
            const incomeFilterButton = document.getElementById('income-filter');
            const incomeIcon = incomeFilterButton.querySelector('img');
            incomeIcon.src = `assets/icons/${incomeFilterOn ? 'check-btn-square' : 'check_btn_squre_cancelled'}.svg`;
        } else if (type === 'expense') {
            expenseFilterOn = !expenseFilterOn;
            const expenseFilterButton = document.getElementById('expense-filter');
            const expenseIcon = expenseFilterButton.querySelector('img');
            expenseIcon.src = `assets/icons/${expenseFilterOn ? 'check-btn-square' : 'check_btn_squre_cancelled'}.svg`;
        }
    };

    return {
        element: `
            <div class="main-page">
               ${inputBar.element}
               <div class="main-page-body">
                   <div class="flex-row">
                       <div class="inline-block">
                            <span>전체 내역</span>
                            <span class="total-count"></span>
                       </div>
                       <div class="flex-row">
                            <div class="flex-row monthly-income-expense-text" id="income-filter">
                                <button class="icon-button">
                                    <img src="assets/icons/check-btn-square.svg" alt="plus icon">
                                </button>
                                <span class="income-text mr-1">수입</span>
                                <span class="income-amount"></span>
                            </div>
                            <div class="flex-row monthly-income-expense-text" id="expense-filter">
                                <button class="icon-button">
                                    <img src="assets/icons/check-btn-square.svg" alt="minus icon">
                                </button>
                                <span class="expense-text mr-1">지출</span>
                                <span class="expense-amount"></span>
                            </div>
                        </div>
                    </div>
                    <div class="daily-list-container"></div>
                </div>
            </div>
        `,
        init: () => {
            // InputBar 초기화
            inputBar.init?.();

            // 날짜 데이터 초기화
            dailyListArray.length = 0;
            if (incomeExpenseStore.currentIncomeExpenseData) {

                dailyListArray.push(...incomeExpenseStore.currentIncomeExpenseData.dailyList);

                const filteredDailyListArray = dailyListArray.filter(item => {
                    if (item.totalIncome > 0 && !incomeFilterOn) return false;
                    if (item.totalExpenses > 0 && !expenseFilterOn) return false;
                    return true;
                });

                filteredDailyListArray.length > 0 && filteredDailyListArray.forEach((item) => {
                    const dailyList = DailyList({ data: item, inputBar, incomeFilterOn, expenseFilterOn });

                    dailyList.init();

                });
            }

            updateDailyListContainer();
            calculate();
            updateTotalsDisplay(); // Update the totals on the screen

            // 필터 버튼 이벤트 리스너
            const incomeFilterButton = document.getElementById('income-filter');
            const expenseFilterButton = document.getElementById('expense-filter');
            incomeFilterButton.addEventListener('click', () => {
                handleFilterToggle('income');
                incomeFilterButton.classList.toggle('active', incomeFilterOn);
                updateDailyListContainer();
            });
            expenseFilterButton.addEventListener('click', () => {
                handleFilterToggle('expense');
                expenseFilterButton.classList.toggle('active', expenseFilterOn);
                updateDailyListContainer();
            });
        }
    };
}
export default MainPage;