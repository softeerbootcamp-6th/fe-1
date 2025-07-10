import { loadCSS } from '../../utils/cssLoader.js';
import InputBar from './components/InputBar.js';

function MainPage() {
    // MainPage CSS 로드
    loadCSS('./src/pages/MainPage/MainPage.css', 'mainpage-css');

    const inputBar = InputBar();

    return {
        element: `
            <div class="main-page">
               ${inputBar.element}
               <h1>가계부</h1>
            </div>
        `,
        init: () => {
            // InputBar 초기화
            if (inputBar.init) {
                inputBar.init();
            }
        }
    }
}
export default MainPage;