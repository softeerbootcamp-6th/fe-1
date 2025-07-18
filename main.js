import createHeader from './components/Header/index.js';
import Router from './js/router.js';

function init() {
    render();
    const router = new Router();
    router.init();
}

function render() {
    const header = createHeader();

    const headerContainer = document.getElementById('header-placeholder');
    headerContainer.innerHTML = '';
    headerContainer.appendChild(header);
}

document.addEventListener('DOMContentLoaded', () => {
    init();
});
