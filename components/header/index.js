import { createElement } from '../../utils.js';
import createCenterNavigation from './centerNavigation.js';
import createHeaderTab from './headerTab.js';

export default function initializeHeader() {
    const $header = createElement(
        'div',
        {
            id: 'header-wrapper',
        },
        [
            `<h1 id="main-title">Wise Wallet</h1>`,
            createCenterNavigation(),
            createHeaderTab(),
        ],
    );

    return $header;
}
