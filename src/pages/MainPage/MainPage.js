import { loadCSS } from '../../utils/cssLoader.js';
import InputBar from './components/InputBar.js';
import DailyList from './components/DailyList.js';
import dataStore from '../../../store/dateStore.js';

function MainPage() {
    // MainPage CSS 로드
    loadCSS('./src/pages/MainPage/MainPage.css', 'mainpage-css');

    const handleFormSubmit = (formData) => {
        dailyListArray.push(formData);
    };

    const inputBar = InputBar(handleFormSubmit);

    let total = 0;
    let totalIncome = 0;
    let totalExpenses = 0;
    const dailyListArray = [];

    const getDailyList = async () => {
        // 현재 날짜에 해당하는 dailyListArray를 반환
        const { year, month } = dataStore.getCurrentDate();
        const response = await fetch('../../../mock/DummyData.json');
        const data = await response.json();
        if (dailyListArray.length !== 0) dailyListArray.length = 0; // 기존 데이터를 초기화
        dailyListArray.push(...data);

        // totalIncome과 totalExpenses 계산
        totalIncome = dailyListArray.reduce((acc, item) => {
            return acc + (item.totalIncome || 0);
        }, 0);
        totalExpenses = dailyListArray.reduce((acc, item) => {
            return acc + (item.totalExpenses || 0);
        }, 0);

        // innerHTML로 income, expenses 업데이트
        const incomeAmountElement = document.querySelector('.income-amount');
        const expenseAmountElement = document.querySelector('.expense-amount');
        if (incomeAmountElement) {
            incomeAmountElement.textContent = `${totalIncome}원`;
        }
        if (expenseAmountElement) {
            expenseAmountElement.textContent = `${totalExpenses}원`;
        }
    };

    // dailyListArray로 파라미터 넘겨 element 넣기
    const updateDailyListContainer = () => {
        const dailyListContainer = document.querySelector('.daily-list-container');
        console.log('dailyListContainer:', dailyListContainer);
        if (dailyListContainer) {
            dailyListContainer.innerHTML = dailyListArray.map((item) => {
                const dailyList = DailyList({ data: item });
                return dailyList.element;
            }).join('');
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
                        <span> ${dailyListArray.length}건</span>
                       </div>
                       <div class="flex-row">
                        <div class="flex-row">
                            <button class="icon-button">
                                <img src="assets/icons/check-btn-square.svg" alt="plus icon">
                            </button>
                            <span class="income-text mr-1">수입</span>
                            <span class="income-amount">${totalIncome}원</span>
                            </div>
                            <div class="flex-row">
                                <button class="icon-button">
                                    <img src="assets/icons/check-btn-square.svg" alt="minus icon">
                                </button>
                                <span class="expense-text mr-1">지출</span>
                                <span class="expense-amount">${totalExpenses}원</span>
                            </div>
                        </div>
                    </div>
                    <div class="daily-list-container"></div>
                </div>
            </div>
        `,
        init: () => {
            // InputBar 초기화
            if (inputBar.init) {
                inputBar.init();
            }

            getDailyList().then(() => {
                dailyListArray.forEach((item) => {
                    const dailyList = DailyList({ data: item });
                    if (dailyList.init) {
                        dailyList.init();
                    }
                });
                updateDailyListContainer();
            });
        }
    };
}
export default MainPage;