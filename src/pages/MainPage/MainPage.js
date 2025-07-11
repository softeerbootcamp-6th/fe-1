import { loadCSS } from '../../utils/cssLoader.js';
import InputBar from './components/InputBar.js';
import DailyList from './components/DailyList.js';

function MainPage() {
    // MainPage CSS 로드
    loadCSS('./src/pages/MainPage/MainPage.css', 'mainpage-css');

    const handleFormSubmit = (formData) => {
        console.log('Received formData in MainPage:', formData);
        dailyListArray.push(formData);
    };

    const inputBar = InputBar(handleFormSubmit);

    const dailyListArray = [];

    return {
        element: `
            <div class="main-page">
               ${inputBar.element}
               <div class="main-page-body">
                   <div>
                       <div class="inline-block">
                        <span>전체 내역</span>
                        <span> 13건</span>
                       </div>
                        <div>
                            <button class="icon-button">
                                <img src="assets/icons/check-btn-square.svg" alt="plus icon">
                            </button>
                            <span class="income-text">수입</span>
                            <span class="income-amount">1,000,000원</span
                        </div>
                        <div>
                            <button class="icon-button">
                                <img src="assets/icons/check-btn-square.svg" alt="minus icon">
                            </button>
                            <span class="expense-text">지출</span>
                            <span class="expense-amount">500,000원</span>
                        </div>
                    </div>
                    <div class="daily-list-container">
                        ${DailyList({ dailyListArray: dailyListArray }).element}
                        ${DailyList({ dailyListArray: dailyListArray }).element}
                    </div>
                </div>
            </div>
        `,
        init: () => {
            // InputBar 초기화
            if (inputBar.init) {
                inputBar.init();
            }
            // DailyList 초기화
            if (DailyList({ dailyListArray: dailyListArray }).init) {
                DailyList({ dailyListArray: dailyListArray }).init();
            }

        }
    }
}
export default MainPage;