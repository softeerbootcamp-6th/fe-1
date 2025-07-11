import createHeader from './components/Header/index.js';
import createInputBar from './components/InputBar/index.js';
import createMonthlyInfo from './components/MonthlyInfo/index.js';

function init() {
    render();
}

function render() {
    const header = createHeader();
    const inputBar = createInputBar();
    const monthlyInfo = createMonthlyInfo();

    const headerContainer = document.getElementById('header-placeholder');
    headerContainer.innerHTML = '';
    headerContainer.appendChild(header);

    const mainContainer = document.getElementById('main-placeholder');
    mainContainer.innerHTML = '';
    mainContainer.appendChild(inputBar);
    mainContainer.appendChild(monthlyInfo);
}

document.addEventListener('DOMContentLoaded', () => {
    init();
});
