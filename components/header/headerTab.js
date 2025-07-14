import { createElement } from '../../utils.js';

export default function createHeaderTab() {
    const headerTabHTML = `
    <ul>
        <li>
            <a>
                <img aria-label="내역" src="/public/doc.svg" />
            </a>
        </li>
        <li>
            <a>
                <img aria-label="달력" src="/public/calendar.svg" />
            </a>
        </li>
        <li>
            <a>
                <img aria-label="통계" src="public/chart.svg" />
            </a>
        </li>
    </ul>
    `;

    const $headerTab = createElement(
        'div',
        {
            id: 'header-tab',
        },
        headerTabHTML,
    );

    return $headerTab;
}
