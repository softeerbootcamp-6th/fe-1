// CSS 로더 유틸리티
export const loadCSS = (href, id) => {
    if (!document.getElementById(id)) {
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }
};

export const unloadCSS = (id) => {
    const link = document.getElementById(id);
    if (link) {
        link.remove();
    }
};
