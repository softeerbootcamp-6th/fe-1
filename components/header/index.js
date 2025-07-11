import { createElement } from '../../utils.js';
import createCenterNavigation from './centerNavigation.js';
import createHeaderTab from './haaderTab.js';

export default function initializeHeader() {
    const $headerPlaceholder = document.getElementById('header-placeholder');

    const $header = createElement(
        'div',
        {
            id: 'header-wrapper',
        },
        `<h1 id="main-title">Wise Wallet</h1>`,
    );

    $header.appendChild(createCenterNavigation());
    $header.appendChild(createHeaderTab());

    $headerPlaceholder.appendChild($header);
}
