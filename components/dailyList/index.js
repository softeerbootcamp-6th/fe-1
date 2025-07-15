import { createElement } from '../../utils.js';
import { dailyData } from '../../store/daily.js';
import createDaliyList from './dailyList.js';
import dateData from '../../store/date.js';

export default function initalizeDailyList() {
    const $container = createElement('ol', { class: 'daily-list-wrapper' }, '');
    const today = new Date().toISOString().split('T')[0];
    const [year, month] = today.split('-');

    dailyData
        .getDailyByYearAndMonth(Number(year), Number(month))
        .forEach((item) => {
            $container.appendChild(createDaliyList(item));
        });

    document.querySelector('#daily-placeholder').appendChild($container);
}

export function dailyViewChange() {
    const { month, year } = dateData;
    const $dailyRoot = document.querySelector('#daily-placeholder');
    $dailyRoot.innerHTML = '';

    const $container = createElement('ol', { class: 'daily-list-wrapper' }, '');
    dailyData.getDailyByYearAndMonth(year, month).forEach((item) => {
        $container.appendChild(createDaliyList(item));
    });
    $dailyRoot.appendChild($container);
}
