import { loadPage } from "./router.js";
import { initializeHeader
 } from "./header.js";
window.addEventListener('DOMContentLoaded', async () => {
    const headerEl = document.getElementById("header");

    const res = await fetch("./components/header.html");
    const html = await res.text();
    headerEl.innerHTML = html;
    initializeHeader();
    await loadPage();
})

window.addEventListener('hashchange', loadPage);