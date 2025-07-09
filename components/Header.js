// 1. Header 기본 구조 만들기 (innerHTML)
// 2. css 적용
// 3. 연월 표시 기능 추가
// 4. 탭 기능 추가

export function renderHeader() {
    const header = document.createElement('header');

    header.innerHTML = `
    <div id="logo">Wise Wallet</div>
    <div>
        <button>
            <img src="../assets/icons/chvron-left.svg">
            </img>
        </button>
        <div>
            <span>2023</span>
            <span>8</span>
            <span>August</span>
        </div>
        <button>
            <img src="../assets/icons/chvron-left.svg">
            </img>
        </button>
        <div>
            <button>
                <img src="../assets/icons/doc.svg"></img>
            </button>
            <button>
                <img src="../assets/icons/calendar.svg"></img>
            </button>
            <button>
                <img src="../assets/icons/chart.svg"></img>
            </button>
        </div>
    </div>

    `
    return header
}