// 1. Header 기본 구조 만들기 (innerHTML)
// 2. css 적용
// 3. 연월 표시 기능 추가
// 4. 탭 기능 추가

export function renderHeader() {
    const header = document.createElement('header');

    header.innerHTML = `
    <div class='header-content'>
        <div class="serif24" id="logo">
            Wise Wallet
        </div>
        <div class='date-content'>
            <button class='arrow'>
                <img src="../assets/icons/chevron-left.svg">
                </img>
            </button>
            <div class='date'>
                <span class='year light14'>2023</span>
                <span class='month serif48'>8</span>
                <span class='month-text light14'>August</span>
            </div>
            <button class='arrow'>
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
    return header
}