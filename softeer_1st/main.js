import { Header } from "./components/Header.js";
import { router } from "./router.js";
import { getLocalStorage, setLocalStorage } from "./utils/localStorage.js";
import { dateStore } from "./store/dateStore.js";

let dateData = getLocalStorage("date");

if (!dateData || typeof dateData.year === "undefined" || typeof dateData.month === "undefined") {
    dateData = { year: 2024, month: 1 };
    setLocalStorage("date", dateData);
}

dateStore.set(dateData.year, dateData.month);

Header();
document.addEventListener("DOMContentLoaded", () => router("home"));
