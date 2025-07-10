export let currentYear = 2023;
export let currentMonth = 8;

export function initCalendar({ onUpdate }) {
  const yearEl = document.getElementById("year");
  const monthEl = document.getElementById("month");
  const monthLabelEl = document.getElementById("month-label");

  const monthNames = ["", "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];

  function updateCalendar() {
    yearEl.textContent = currentYear;
    monthEl.textContent = currentMonth;
    monthLabelEl.textContent = monthNames[currentMonth];
    // onUpdate(currentYear, currentMonth);
  }

  document.getElementById("prev-month").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 1) {
      currentMonth = 12;
      currentYear--;
    }
    updateCalendar();
  });

  document.getElementById("next-month").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }
    updateCalendar();
  });

  updateCalendar(); // 초기 렌더링
}