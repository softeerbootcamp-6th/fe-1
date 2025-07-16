import { loadCSS } from '../../utils/cssLoader.js';
import InputBar from './components/InputBar.js';
import DailyList from './components/DailyList.js';
import dataStore from '../../../store/dateStore.js';
import { calculateTotal, calculateFieldLength } from '../../utils/calculate.js';
import incomeExpenseStore from '../../../store/incomeExpenseStore.js';

function MainPage() {
    // MainPage CSS 로드
    loadCSS('./src/pages/MainPage/MainPage.css', 'mainpage-css');

    const handleFormSubmit = (formData) => {
        // dailyListArray.push(formData);
        incomeExpenseStore.updateAllDummyData(formData);
    };

    const inputBar = InputBar(handleFormSubmit);

    let total = 0;
    let totalIncome = 0;
    let totalExpenses = 0;
    const dailyListArray = [];

    // 수입과 지출의 총액 계산
    const calculate = () => {
        totalIncome = calculateTotal(dailyListArray, 'totalIncome');
        totalExpenses = calculateTotal(dailyListArray, 'totalExpenses');
        total = calculateFieldLength(dailyListArray, 'list');
    };

    // dailyListArray로 파라미터 넘겨 element 넣기
    const updateDailyListContainer = () => {
        const dailyListContainer = document.querySelector('.daily-list-container');

        if (dailyListArray.length > 0) {
            dailyListContainer.innerHTML = dailyListArray.map((item) => {
                const dailyList = DailyList({ data: item });
                return dailyList.element;
            }).join('');
        }
        else dailyListContainer.innerHTML = '';
    };

    const updateTotalsDisplay = () => {
        const incomeAmountElement = document.querySelector('.income-amount');
        const expenseAmountElement = document.querySelector('.expense-amount');
        const totalCountElement = document.querySelector('.total-count');

        incomeAmountElement.textContent = `${totalIncome}원`;
        expenseAmountElement.textContent = `${totalExpenses}원`;
        totalCountElement.textContent = `${total}건`;

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
                        <div class="flex-row">
                            <button class="icon-button">
                                <img src="assets/icons/check-btn-square.svg" alt="plus icon">
                            </button>
                            <span class="income-text mr-1">수입</span>
                            <span class="income-amount"></span>
                            </div>
                            <div class="flex-row">
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

                dailyListArray.length > 0 && dailyListArray.forEach((item) => {
                    const dailyList = DailyList({ data: item });

                    dailyList.init();

                });
            }

            updateDailyListContainer();
            calculate();
            updateTotalsDisplay(); // Update the totals on the screen
        }
    };
}
export default MainPage;