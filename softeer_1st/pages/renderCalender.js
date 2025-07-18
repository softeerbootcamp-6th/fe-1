import { createElement } from "../utils/createElement.js";
import { dateStore } from "../store/dateStore.js";
import { CalenderDate } from "../components/CalenderDate.js";
import { dataStore } from "../store/dataStore.js";
import data from "../backend/data.js";
export function renderCalender() {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1; // 월은 0부터
    const todayDate = today.getDate();
    // 1. 기본 구조 완성 및 초기 렌더, 이벤트 발생 후 리렌더 로직 발생 명시
    const section = createElement("section", {
        className: "calender-page",
        id: "calender-page",
    });
    const calender = createElement("div", {
        className: "calender",
    });
    const stats = createElement("div", {
        className: "calender-stats serif-14",
    });

    section.appendChild(calender);
    section.appendChild(stats);


    const handleDataChange = (data) =>{
        calender.innerHTML = "";
        stats.innerHTML = "";
        renderCalenderCell(data, {todayYear, todayMonth, todayDate});
    }
    dataStore.subscribe(handleDataChange); // 데이터 변경 시 리렌더링
    // window.addEventListener("date-change", handleDateChange); 이걸 빼도 되는 이유: header에서 date set호출, set에서 loadData호출.

    dataStore.loadData(dateStore.year, dateStore.month);
    // 2. 리렌더 함수 정의
    async function renderCalenderCell(monthData, {todayYear, todayMonth, todayDate}) {
        const [year, month] = [dateStore.year, dateStore.month];
        const koreanDays = ["일", "월", "화", "수", "목", "금", "토"];
        koreanDays.forEach((day) => {
            const dayElement = createElement("div", {
                className: "calender-header light-12",
                textContent: day,
            });
            calender.appendChild(dayElement);
        });
        const firstDay = new Date(year, month - 1, 1);
        const startDay = firstDay.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
        const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
        Array.from({ length: startDay }).forEach(() => {
            const emptyCell = createElement("div", {
                className: "calender-cell disabled",
            });
            calender.appendChild(emptyCell);
        });
        const [totalIncome, totalExpense] = monthData.reduce(
            (acc, item) => {
                if(item.type === "income") {
                    acc[0] += item.amount;
                } else if(item.type === "expense") {
                    acc[1] += item.amount;
                }
                return acc;
            },
            [0, 0]
        );
        stats.innerHTML = `
                <div class="flex justify-between align-center">
                    <div>
                        ${totalIncome !== 0 ? `<span class="calender-total-income">총 수입 ${totalIncome.toLocaleString()}원</span>` : ""}
                        ${totalExpense !== 0 ? `<span class="calender-total-expense">총 지출 ${totalExpense.toLocaleString()}원</span>` : ""}
                    </div>
                    <div>
                        <span>총합 ${(totalIncome - totalExpense).toLocaleString()}원</span>
                    </div>
                </div>
            `;
        const grouped = {};
        monthData.forEach((item) => {
            const dateKey = `${item.date}`;
            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }
            grouped[dateKey].push(item);
        });
        const processedData = [];
        for (let date = 1; date <= daysInMonth(year, month); date++) {
            const dateKey = `${date}`;
            if (grouped[dateKey]) {
                processedData.push({
                    date,
                    items: grouped[dateKey],
                });
            } else {
                processedData.push({
                    date,
                    items: [],
                });
            }
        }
        processedData.forEach((item) => {
            const { date, items } = item;
            const isToday = date === todayDate && month === todayMonth && year === todayYear;
            const calenderCell = CalenderDate({ date, items, isToday });
            calender.appendChild(calenderCell);
        });
        const remainingCells = 7 - ((processedData.length + startDay) % 7);
        if (remainingCells < 7) {
            Array.from({ length: remainingCells }).forEach(() => {
                const emptyCell = createElement("div", {
                    className: "calender-cell disabled",
                });
                calender.appendChild(emptyCell);
            });
        }
    }
    return section;
}
