import { createElement } from '../../utils.js';
import { dailyData } from '../../store/daily.js';
import createDaliyList from './dailyList.js';
import dateData from '../../store/date.js';

export default function initalizeDailyList() {
    const today = new Date().toISOString().split('T')[0];
    const [year, month] = today.split('-');

    dailyViewChange(year, month);
}

export function dailyViewChange(year, month) {
    const $dailyRoot = document.querySelector('#daily-placeholder');
    $dailyRoot.innerHTML = '';

    let monthTotalIncome = 0;
    let monthTotalExpense = 0;
    let totalCount = 0;

    const $container = createElement('ol', { class: 'daily-list-wrapper' }, '');

    dailyData
        .getDailyByYearAndMonth(Number(year), Number(month))
        .forEach((list) => {
            list.items.forEach((item) => {
                totalCount += 1;
                if (item.amount > 0) {
                    monthTotalIncome += item.amount;
                } else {
                    monthTotalExpense += -item.amount;
                }
            });
            $container.appendChild(createDaliyList(list));
        });
    $dailyRoot.innerHTML = `
        <div class="total-header">
            <div class="lt-12">전체 내역    ${totalCount}건 </div>
            <div class="amount-wrapper">
                <div class="amount-container">    
                    <div class="check-wrapper"> 
                        <img width="12" height="12" src="/public/check.svg" /> 
                    </div>
                    <span class="lt-12">수입: ${monthTotalIncome}</span>
                </div>
                <div class="amount-container">
                    <div class="check-wrapper"> 
                        <img width="12" height="12" src="/public/check.svg" /> 
                    </div>
                    <span class="lt-12">지출: ${monthTotalExpense}<span>
                </div>
            </div>
        </div>`;
    document.querySelector('#daily-placeholder').appendChild($container);
    $dailyRoot.appendChild($container);
}
