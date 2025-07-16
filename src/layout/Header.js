import dateStore from "../store/dateStore.js";
import incomeExpenseStore from "../store/incomeExpenseStore.js";
import MainPage from "../pages/MainPage/MainPage.js";

function Header() {
    const updateDateText = () => {
        const { year, month } = dateStore.getCurrentDate();
        document.getElementById("year-text").textContent = `${year}`;
        document.getElementById("month-text").textContent = `${month}`;


        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        document.querySelector(".date-container span:last-child").textContent = monthNames[month - 1];
    };

    // 현재 날짜에 해당하는 수입/지출 데이터 가져오기
    const updateDailyListContainer = () => {
        incomeExpenseStore.getCurrentIncomeExpenseList();

        const mainPage = MainPage();
        mainPage.init();
    };


    return {
        element: `
            <header>
                <div class="header">
                    <div class="flex-row">
                        <span class="logo">Wise Wallet</span>
                        <div class="flex-row">
                            <button class="arrow-icon" id="prev-month">
                                <img src="assets/icons/chevron-left.svg" alt="이전 달">
                            </button>
                            <div class="date-container">
                                <span class="year-text" id="year-text"></span>
                                <span class="month-text" id="month-text"></span>
                                <span>August</span>
                            </div>
                            <button class="arrow-icon" id="next-month">
                                <img src="assets/icons/chevron-right.svg" alt="다음 달">
                            </button>
                        </div>
                        <div class="flex-row">
                            <button class="icon-button">
                                <img src="assets/icons/history.svg" alt="History Icon">
                            </button>
                            <button class="icon-button">
                                <img src="assets/icons/calendar.svg" alt="Calendar Icon">
                            </button>
                            <button class="icon-button">
                                <img src="assets/icons/statistics.svg" alt="Statistics Icon">
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        `,
        init: () => {
            // 초기 날짜 표시
            updateDateText();

            // 버튼 이벤트 연결
            document.getElementById("prev-month").addEventListener("click", () => {
                dateStore.decreaseMonth();
                updateDateText();
                updateDailyListContainer();
            });

            document.getElementById("next-month").addEventListener("click", () => {
                dateStore.increaseMonth();
                updateDateText();
                updateDailyListContainer();
            });
        }
    }
}

export default Header;
