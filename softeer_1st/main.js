import { Header } from "./components/Header.js";
// import { worker } from './mocks/browser.js';

// // MSW 워커 시작 - 일시적으로 비활성화
// worker.start({
//     onUnhandledRequest: 'bypass'
// });

import { router } from "./router.js";
import { getLocalStorage, setLocalStorage } from "./utils/localStorage.js";
import { dateStore } from "./store/dateStore.js";

let dateData = getLocalStorage("date");

if (
    !dateData ||
    typeof dateData.year === "undefined" ||
    typeof dateData.month === "undefined"
) {
    dateData = { year: 2024, month: 1 };
    setLocalStorage("date", dateData);
}

dateStore.set(dateData.year, dateData.month);

Header();
document.addEventListener("DOMContentLoaded", () => router("home"));
