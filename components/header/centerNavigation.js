import { createElement } from '../../utils.js';
import dateData from '../../store/date.js';
import { dailyViewChange } from '../dailyList/index.js';
import { dateViewChange } from '../../view/dateView.js';

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

    // 이벤트 위임으로 해도될 듯?
    $minusBtn.addEventListener('click', () => {
        dateData.decreaseMonth();
        dailyViewChange(dateData.year, dateData.month);
        dateViewChange(dateData.year, dateData.month);
    });
    $plusBtn.addEventListener('click', () => {
        dateData.increaseMonth();
        dateViewChange(dateData.year, dateData.month);
        dailyViewChange(dateData.year, dateData.month);
    });

    return $centerNavigation;
}
