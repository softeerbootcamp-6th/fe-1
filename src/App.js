import Header from './layout/Header.js';
import MainPage from './pages/MainPage/MainPage.js';
import dateStore from '../store/dateStore.js';

function App() {
    const header = Header();
    const mainPage = MainPage();


    return {
        element: `
            ${header.element}
            ${mainPage.element}
        `,
        init: () => {
            // 날짜 데이터 초기화
            if (dateStore.initDateData) {
                dateStore.initDateData();
            }

            // Header 초기화
            if (header.init) {
                header.init();
            }

            // MainPage 초기화
            if (mainPage.init) {
                mainPage.init();
            }




        }
    }
}

export default App;