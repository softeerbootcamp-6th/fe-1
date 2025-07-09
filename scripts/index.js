import { loadPage } from "./router.js";

window.addEventListener('DOMContentLoaded', async () => {
    const headerEl = document.getElementById("header");

    const res = await fetch("./components/header.html");
    const html = await res.text();
    headerEl.innerHTML = html;
    
    await loadPage();
})

window.addEventListener('hashchange', loadPage);