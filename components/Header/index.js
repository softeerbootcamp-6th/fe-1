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
        <a href="/" class="logo-text serif-24" data-nav="/">Wise Wallet</a>
        <div class="date-container">
            <button class="prev-month-button">
                <img
                    width="32"
                    height="32"
                    src="/assets/icons/chevron-left.svg"
                    alt="Previous Month Icon"
                />
            </button>
            <div class="date">
                <span class="year light-14">${year}</span>
                <span class="month-number serif-48">${month}</span>
                <span class="month-name light-14">${formatMonthName(
                    month
                )}</span>
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
                        <a href="${
                            item.href
                        }" class="header-nav-link" data-nav="${item.href}"
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

    header.addEventListener('click', (e) => {
        const navLink = e.target.closest('[data-nav]');
        if (navLink) {
            e.preventDefault();
            const path = navLink.getAttribute('data-nav');

            document.dispatchEvent(
                new CustomEvent('navigate', {
                    detail: { path },
                })
            );
        }
    });

    header
        .querySelector('.prev-month-button')
        ?.addEventListener('click', () => {
            dateStore.decreaseMonth();
        });

    header
        .querySelector('.next-month-button')
        ?.addEventListener('click', () => {
            dateStore.increaseMonth();
        });

    document.addEventListener('dateChanged', (e) => {
        const { year, month } = e.detail;
        header.querySelector('.year').textContent = year;
        header.querySelector('.month-number').textContent = month;
        header.querySelector('.month-name').textContent =
            formatMonthName(month);
    });

    document.addEventListener('routeChanged', (e) => {
        const { path } = e.detail;
        header.querySelectorAll('.header-nav-link').forEach((link) => {
            const linkPath = link.getAttribute('data-nav');
            linkPath === path
                ? link.classList.add('active')
                : link.classList.remove('active');
        });
    });

    return header;
}
