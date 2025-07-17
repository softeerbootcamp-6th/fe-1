import Header from './layout/Header.js';
import MainPage from './pages/MainPage/MainPage.js';
import dateStore from './store/dateStore.js';
import incomeExpenseStore from './store/incomeExpenseStore.js';

function App() {
    const header = Header();
    const mainPage = MainPage();


    return {
        element: `
            ${header.element}
            ${mainPage.element}
        `,
        init: async () => {
            // 날짜 데이터 초기화
            dateStore?.initDateData();

            // Header 초기화
            header?.init();

            await incomeExpenseStore.getAllDummyData();

            // MainPage 초기화
            mainPage?.init();


        }
    }
}

export default App;