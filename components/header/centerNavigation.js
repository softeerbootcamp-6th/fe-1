import { createElement } from '../../utils.js';
import dateData from '../../store/date.js';

export default function createCenterNavigation() {
    const centerNavigationHTML = `
    <button>
        <img
            aria-label="왼쪽 버튼"
            src="public/chevron-left.svg"
        />
    </button>
    <div id="location">
        <span>2023</span>
        <span>8</span>
        <span>August</span>
    </div>
    <button>
        <img
            aria-label="오른쪽 버튼"
            src="/public/chevron-right.svg"
        />
    </button>
    `;

    const $centerNavigation = createElement(
        'div',
        {
            id: 'center-wrapper',
        },
        centerNavigationHTML,
    );

    const [$minusBtn, _, $plusBtn] = $centerNavigation.children;

    $minusBtn.addEventListener('click', () => {
        dateData.decreaseMonth();
    });
    $plusBtn.addEventListener('click', () => {
        dateData.increaseMonth();
    });

    return $centerNavigation;
}
