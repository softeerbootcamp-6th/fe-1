// 1. Header 기본 구조 만들기 (innerHTML) v
// 2. css 적용 v
// 3. 연월 이동 기능 추가 
// 4. 탭 기능 추가
// 5. 홈으로 돌아오기 기능 추가

import dateState from "../states/DateState.js";

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function renderHeader() {
    const header = document.createElement('header');
    const year = dateState.getYear();
    const month = dateState.getMonth();
    const monthText = monthNames[month - 1];
    
    header.innerHTML = `
    <div class='header-content'>
        <div class="serif24" id="logo">
            Wise Wallet
        </div>
        <div class='date-content'>
            <button class='arrow' id='left-arrow'>
                <img src="../assets/icons/chevron-left.svg">
                </img>
            </button>
            <div class='date'>
                <span class='year light14'>${year}</span>
                <span class='month serif48'>${month}</span>
                <span class='month-text light14'>${monthText}</span>
            </div>
            <button class='arrow' id='right-arrow'>
                <img src="../assets/icons/chevron-right.svg">
                </img>
            </button>
        </div>
        <nav class='tabs'>
            <button class='tab-button'>
                <img src="../assets/icons/doc.svg"></img>
            </button>
            <button class='tab-button'>
                <img src="../assets/icons/calendar.svg"></img>
            </button>
            <button class='tab-button'>
                <img src="../assets/icons/chart.svg"></img>
            </button>
        </nav>
    </div>
    `
    // 요소 가져오기
    const leftArrow = header.querySelector('#left-arrow'); // 둘 다 같은 arrow class 사용하므로 id로 구분
    const rightArrow = header.querySelector('#right-arrow');
    const yearSpan = header.querySelector('.year');
    const monthSpan = header.querySelector('.month');
    const monthTextSpan = header.querySelector('.month-text');

    // 상태 변경 시 UI 업데이트
    dateState.subscribe(({ year, month }) => {
        if (yearSpan) yearSpan.textContent = year;
        if (monthSpan) monthSpan.textContent = month;
        if (monthTextSpan) monthTextSpan.textContent = monthNames[month - 1];
    });

    leftArrow.addEventListener('click', () => {
        preDate();
    });

    rightArrow.addEventListener('click', () => {
        nextDate();
    });

    const nextDate = () => {
        if (dateState.getMonth() === 12) {
            dateState.setYear(dateState.getYear() + 1);
            dateState.setMonth(1);
        } else {
            dateState.setMonth(dateState.getMonth() + 1);
        }
    }

    const preDate = () => {
        if (dateState.getMonth() === 1) {
            dateState.setYear(dateState.getYear() - 1);
            dateState.setMonth(12);
        } else {
            dateState.setMonth(dateState.getMonth() - 1);
        }
    }

    return header
}