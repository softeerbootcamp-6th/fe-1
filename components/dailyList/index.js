import { createElement } from '../../utils.js';
import { dailyData } from '../../store/daily.js';
import createDaliyList from './dailyList.js';

export default function initalizeDailyList() {
    const $container = createElement('ol', { class: '' }, '');

    dailyData.data.forEach((item) => {
        $container.appendChild(createDaliyList(item));
    });

    document.querySelector('#daily-placeholder').appendChild($container);
}
