import { renderMain } from "./pages/renderMain.js";
import { renderCalender } from "./pages/renderCalender.js";
import { renderStats } from "./pages/renderStats.js";
export function router(route) {
    const main = document.getElementById("main");

    switch (route) {
        case "home":
            main.innerHTML = "";
            main.appendChild(renderMain());
            break;
        case "calender":
            main.innerHTML = "";
            main.appendChild(renderCalender());
            break;
        case "stats":
            main.innerHTML = "";
            main.appendChild(renderStats());
            break;
    }
}
