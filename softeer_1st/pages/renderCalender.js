import { createElement } from "../utils/createElement.js";
import { dateStore } from "../store/dateStore.js";
export function renderCalender() {
    const koreanDays = ["일", "월", "화", "수", "목", "금", "토"];
    const section = createElement("section", {
        className: "calender-page",
        id: "calender-page",
    });
    const calender = createElement("div", {
        className: "calender",
    });
    koreanDays.forEach((day) => {
        const dayElement = createElement("div", {
            className: "calender-header light-12",
            textContent: day,
        });
        calender.appendChild(dayElement);
    });
    section.appendChild(calender);
    renderCalenderCell(dateStore.year, dateStore.month);

    function renderCalenderCell(year, month) {}
    function fetchCalenderData(year, month) {
        return fetch(
            `http://localhost:3000/api/data?year=${year}&month=${month}`
        )
            .then((response) => response.json())
            .catch((error) => {
                console.error("Error fetching calendar data:", error);
                return [];
            });
    }
    return section;
}
