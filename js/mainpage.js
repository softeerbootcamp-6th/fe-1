import createInputBar from '../components/InputBar/index.js';
import createMonthlyInfo from '../components/MonthlyInfo/index.js';

export function createMain() {
    const inputBar = createInputBar();
    const monthlyInfo = createMonthlyInfo();

    return [inputBar, monthlyInfo];
}
