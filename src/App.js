import Header from './layout/Header.js';
import MainPage from './pages/MainPage/MainPage.js';

function App() {
    const mainPage = MainPage();
    
    return {
        element: `
            ${Header().element}
            ${mainPage.element}
        `,
        init: () => {
            // MainPage 초기화
            if (mainPage.init) {
                mainPage.init();
            }
        }
    }
}

export default App;