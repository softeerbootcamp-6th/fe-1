import { Header } from "./components/Header.js";
import { worker } from "./mocks/browser.js";
import { router } from "./router.js";
import { getLocalStorage, setLocalStorage } from "./utils/localStorage.js";
import { dateStore } from "./store/dateStore.js";

// MSW 워커 시작 및 애플리케이션 초기화
async function startApp() {
    // MSW 워커 시작을 기다림
    await worker.start({
        onUnhandledRequest: "bypass",
    });

    console.log("[MSW] Worker started successfully");

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
    router("home");
}

// DOMContentLoaded 이벤트에서 앱 시작
document.addEventListener("DOMContentLoaded", startApp);
