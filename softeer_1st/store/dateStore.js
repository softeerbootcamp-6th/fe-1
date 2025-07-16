import { setLocalStorage } from "../utils/localStorage.js";

const MIN_YEAR = 2020;
const MAX_YEAR = 2030;
const MIN_MONTH = 1;
const MAX_MONTH = 12;

const englishMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const dateStore = {
    year: 2024,
    month: 1,
    englishMonth: "January",

    set(year, month) {
        this.year = year;
        this.month = month;
        this.englishMonth = englishMonths[month - 1];

        window.dispatchEvent(
            new CustomEvent("date-change", {
                detail: { year, month, englishMonth: this.englishMonth },
            })
        );
    },

    move(delta) {
        let y = this.year;
        let m = this.month + delta;

        if (m < MIN_MONTH) {
            y--;
            m = 12;
        }
        if (m > MAX_MONTH) {
            y++;
            m = 1;
        }

        if (y < MIN_YEAR || y > MAX_YEAR) return; // 범위 밖이면 무시
        this.set(y, m);
        setLocalStorage("date", { year: this.year, month: this.month });
    },
};
