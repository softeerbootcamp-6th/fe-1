function Header() {
    return {
        element: `
            <header>
                <div class="header">
                    <div class="row">
                        <span class="logo">Wise Wallet</span>
                        <div class="row">
                            <button class="arrow-icon">
                                <img src="assets/icons/chevron-left.svg" alt="이전 달">
                            </button>
                            <div class="date-container">
                                <span class="year-text">2023</span>
                                <span class="month-text">8</span>
                                <span>August</span>
                            </div>
                            <button class="arrow-icon">
                                <img src="assets/icons/chevron-right.svg" alt="다음 달">
                            </button>
                        </div>
                        <div>
                            <button class="icon-button">
                                <img src="assets/icons/history.svg" alt="History Icon">
                            </button>
                            <button class="icon-button">
                                <img src="assets/icons/calendar.svg" alt="Calendar Icon">
                            </button>
                            <button class="icon-button">
                                <img src="assets/icons/statistics.svg" alt="Statistics Icon">
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        `,
    }
}

export default Header;