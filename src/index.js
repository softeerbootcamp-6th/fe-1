import App from './App.js';

const render= () => {
    const app = document.getElementById('app');
    if (app) {
        app.innerHTML = App().element;
    } else {
        console.error('App element not found');
    }
};

render();