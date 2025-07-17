import dateStore from '../../store/date.js';
import { formatMonthName } from '../../lib/utils.js'; 
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

export default function createHeader() {
    const { year, month } = dateStore;

    const header = document.createElement('div');
    header.className = 'header-container';
    header.innerHTML = `
        <a href="/" class="logo-text serif-24">Wise Wallet</a>
        <div class="date">
            <button class="prev-month-button">
                <img
                    width="32"
                    height="32"
                    src="/assets/icons/chevron-left.svg"
                    alt="Previous Month Icon"
                />
            </button>
            <div class="date-container">
                <span class="year light-14">${year}</span>
                <span class="month-number serif-48">${month}</span>
                <span class="month-name light-14">${formatMonthName(month)}</span>
            </div>
            <button class="next-month-button">
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
    `;

    header.querySelector('.prev-month-button')?.addEventListener('click', () => {
        dateStore.decreaseMonth();
    });

    header.querySelector('.next-month-button')?.addEventListener('click', () => {
        dateStore.increaseMonth();
    });

    document.addEventListener('dateChanged', (e) => {
        const { year, month } = e.detail;
        header.querySelector('.year').textContent = year;
        header.querySelector('.month-number').textContent = month;
        header.querySelector('.month-name').textContent = formatMonthName(month);
    });

    return header;
}
