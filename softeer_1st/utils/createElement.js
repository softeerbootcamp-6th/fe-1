export function createElement(tag, options = {}) {
    const el = document.createElement(tag);
    if (options.className) el.className = options.className;
    if (options.textContent) el.textContent = options.textContent;
    if (options.type) el.type = options.type;
    if (options.placeholder) el.placeholder = options.placeholder;
    if (options.maxLength) el.maxLength = options.maxLength;
    if (options.innerHTML) el.innerHTML = options.innerHTML;
    if (options.id) el.id = options.id;
    if (options.src) el.src = options.src;
    if (options.alt) el.alt = options.alt;
    if (options.style) {
        for (const [key, value] of Object.entries(options.style)) {
            el.style[key] = value;
        }
    }
    if (options.placeholder) {
        el.placeholder = options.placeholder;
    }
    if( options.readOnly !== undefined) {
        el.readOnly = options.readOnly;
    }
    return el;
}
