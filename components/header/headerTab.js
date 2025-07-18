import { createElement } from '../../utils.js';

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

export default function createHeaderTab() {
    const $headerTab = createElement(
        'div',
        {
            id: 'header-tab',
        },
        headerTabHTML,
    );

    return $headerTab;
}
