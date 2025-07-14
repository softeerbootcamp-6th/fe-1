import { createElement, formatDateToKorean } from '../../utils.js';
import createDaily from './daily.js';

export default function createDaliyList(dailyInfo) {
    const { date } = dailyInfo;
    const dateToKorean = formatDateToKorean(date);

    const dailyListContainerInnerHtml = `
        <div class="date-info">${dateToKorean}</div>
        <div></div>
        <ol class="daliy-line-wrapper"></ol>
    `;

    const $dailyListContainer = createElement(
        'li',
        {
            class: 'day-container',
        },
        dailyListContainerInnerHtml,
    );

    const $dailyListWrapper = $dailyListContainer.querySelector(
        '.daliy-line-wrapper',
    );

    dailyInfo.items.forEach((info) => {
        $dailyListWrapper.appendChild(createDaily(info));
    });

    return $dailyListContainer;
}
