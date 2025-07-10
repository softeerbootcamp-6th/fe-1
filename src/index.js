import App from './App.js';

const render= () => {
    const app = document.getElementById('app');
    if (app) {
        const appComponent = App();
        app.innerHTML = appComponent.element;
        
        // 컴포넌트 초기화
        if (appComponent.init) {
            appComponent.init();
        }
    } else {
        console.error('App element not found');
    }
};

render();