import Header from './layout/Header.js';
import MainPage from './pages/MainPage/MainPage.js';

function App() {
    return {
        element: `
            ${Header().element}
            ${MainPage().element}
        `,
    }
}

export default App;