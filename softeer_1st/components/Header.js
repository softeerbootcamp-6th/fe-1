import { router } from "../router.js";
import { dateStore } from "../store/dateStore.js";

export function Header() {
    const header = document.getElementById("header");
    header.innerHTML = `
    <nav class="header">
    <div class="nav-inner">
      <a id="logo" class="serif-24">Wise Wallet</a>
      <div id="dates" class="header-main">
      <button id="prev-btn" class="chev"><img src="../assets/icons/chevron-left.svg" alt="previous"></button>
      <div class="header-date">
        <div class="light-14" id="date-year">2024</div>
        <div class="serif-48" id="date-month-num">1</div>
        <div class="light-14" id="date-month-en">January</div>
      </div>
        <button id="next-btn" class="chev"><img src="../assets/icons/chevron-right.svg" alt="next"></button>
      </div>

      <div id="nav-buttons" class="flex gap-4">
        <button id="home-btn"     class="nav-btn active"><img src="../assets/icons/doc.svg"      alt="home"></button>
        <button id="calender-btn" class="nav-btn"><img src="../assets/icons/calendar.svg" alt="calendar"></button>
        <button id="stats-btn"    class="nav-btn"><img src="../assets/icons/chart.svg"    alt="stats"></button>
      </div>
    </div>
  </nav>
    
    `;
    const updateDateDisplay = () => {
        header.querySelector("#date-year").textContent = dateStore.year;
        header.querySelector("#date-month-num").textContent = dateStore.month;
        header.querySelector("#date-month-en").textContent = dateStore.englishMonth;
    };
    updateDateDisplay();
    window.addEventListener("date-change", updateDateDisplay);
    header.querySelector("#prev-btn").addEventListener("click", () => {
        dateStore.move(-1);
    });
    header.querySelector("#next-btn").addEventListener("click", () => {
        dateStore.move(1);
    });
    const navButtons = header.querySelectorAll(".nav-btn");

    navButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            navButtons.forEach((b) => b.classList.remove("active"));
            e.currentTarget.classList.add("active");
        });
    });
    header.querySelector("#logo").addEventListener("click", (e) => {
        e.preventDefault();
        router("home");
    });
    header.querySelector("#home-btn").addEventListener("click", () => {
        router("home");
    });
    header.querySelector("#calender-btn").addEventListener("click", () => {
        router("calender");
    });
    header.querySelector("#stats-btn").addEventListener("click", () => {
        router("stats");
    });
}
