import dateData from '../../store/date.js';

export default function addHeaderHTML() {
    const $header = document.getElementById('header-placeholder');

    $header.innerHTML += `
    <div id="header-wrapper">
        <h1 id="main-title">Wise Wallet</h1>
        <div id="center-wrapper">
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
        </div>
        <div id="header-tab">
            <ul>
                <li>
                    <a
                        ><img aria-label="내역" src="/public/doc.svg"
                    /></a>
                </li>
                <li>
                    <a
                        ><img
                            aria-label="달력"
                            src="/public/calendar.svg"
                    /></a>
                </li>
                <li>
                    <a
                        ><img aria-label="통계" src="public/chart.svg"
                    /></a>
                </li>
            </ul>
        </div>
    </div>
    `;

    dateData.initDateData();

    const $centerWrapper = document.getElementById('center-wrapper');
    const children = $centerWrapper.children;

    children[0].addEventListener('click', () => {
        dateData.decreaseMonth();
        console.log('dd');
    });
    children[2].addEventListener('click', () => {
        dateData.increaseMonth();
    });
}
