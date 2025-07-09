import { loadCSS } from '../../utils/cssLoader.js';
import InputBar from './components/InputBar.js';

function MainPage(){
    // MainPage CSS 로드
    loadCSS('./src/pages/MainPage/MainPage.css', 'mainpage-css');
    
    return {
        element: `
            <div class="main-page">
               ${InputBar().element}
               <h1>가계부</h1>
            </div>
        `,
    }
}
export default MainPage;