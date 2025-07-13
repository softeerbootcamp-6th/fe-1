import createHeader from './components/Header/index.js';
import { createMain } from './js/mainpage.js';

function init() {
    render();
}

function render() {
    const header = createHeader();

    const headerContainer = document.getElementById('header-placeholder');
    headerContainer.innerHTML = '';
    headerContainer.appendChild(header);

    const main = createMain();

    const mainContainer = document.getElementById('main-placeholder');
    mainContainer.innerHTML = '';
    main.map((item) => mainContainer.appendChild(item));
}

document.addEventListener('DOMContentLoaded', () => {
    init();
});
