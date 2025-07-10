const NavItemIcon = [
    {
        href: '/',
        icon: '/assets/icons/doc.svg',
        alt: 'Document Icon',
    },
    {
        href: '/calendar',
        icon: '/assets/icons/calendar.svg',
        alt: 'Calendar Icon',
    },
    {
        href: '/chart',
        icon: '/assets/icons/chart.svg',
        alt: 'Chart Icon',
    },
];

const headerHtml = `
    <div class="header-container">
        <a href="/" class="logo-text serif-24">Wise Wallet</a>
        <div class="date">
            <button class="month-control-button">
                <img
                    width="32"
                    height="32"
                    src="/assets/icons/chevron-left.svg"
                    alt="Previous Month Icon"
                />
            </button>
            <div class="date-container">
                <span class="year light-14">2023</span>
                <span class="month-number serif-48">8</span>
                <span class="month-name light-14">August</span>
            </div>
            <button class="month-control-button">
                <img
                    width="32"
                    height="32"
                    src="/assets/icons/chevron-right.svg"
                    alt="Next Month Icon"
                />
            </button>
        </div>
        <nav>
            <ul class="nav-list">
                ${NavItemIcon.map(
                    (item) => `
                    <li>
                        <a href="${item.href}" class="header-nav-link
                            ${
                                item.href === window.location.pathname
                                    ? 'active'
                                    : ''
                            }"
                        >
                            <img
                                width="24"
                                height="24"
                                src="${item.icon}"
                                alt="${item.alt}"
                            />
                        </a>
                    </li>
                `
                ).join('')}
            </ul>
        </nav>
    </div>
`;

document.getElementById('header-placeholder').innerHTML += headerHtml;
