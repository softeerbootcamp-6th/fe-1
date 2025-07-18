import { createMain } from './mainpage.js';
import { createCalendarPage } from './calendarPage.js';

class Router {
    constructor() {
        this.routes = {
            '/': () => createMain(),
            '/calendar': () => createCalendarPage(),
        };
        this.setupEventListeners();
    }

    renderCurrentPage() {
        const currentPath = window.location.pathname;
        const createPageComponents =
            this.routes[currentPath] || this.routes['/'];
        const pageComponents = createPageComponents();

        const mainContainer = document.getElementById('main-placeholder');
        mainContainer.innerHTML = '';
        pageComponents.forEach((component) =>
            mainContainer.appendChild(component)
        );

        document.dispatchEvent(
            new CustomEvent('routeChanged', {
                detail: { path: currentPath },
            })
        );
    }

    navigateTo(path) {
        if (window.location.pathname === path) return;
        window.history.pushState({}, '', path);
        this.renderCurrentPage();
    }

    setupEventListeners() {
        document.addEventListener('navigate', (e) => {
            this.navigateTo(e.detail.path);
        });

        window.addEventListener('popstate', () => {
            this.renderCurrentPage();
        });
    }

    init() {
        this.renderCurrentPage();
    }
}

export default Router;
