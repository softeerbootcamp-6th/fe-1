function initHeader() {
  const yearEl = document.querySelector("#currentMonth .year");
  const monthNumEl = document.querySelector("#currentMonth .month-num");
  const monthEngEl = document.querySelector("#currentMonth .month-eng");
  const prevBtn = document.getElementById("prevMonthBtn");
  const nextBtn = document.getElementById("nextMonthBtn");
  const tabBtns = document.querySelectorAll(".tab-btn");

  // 오늘 날짜 설정
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();

  // 월 이름 설정
  const monthNames = [
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

  function updateMonth() {
    yearEl.textContent = year;
    monthNumEl.textContent = month + 1;
    monthEngEl.textContent = monthNames[month];
    // 여기에 내역 리스트 갱신 함수 호출 가능
  }

  prevBtn.addEventListener("click", () => {
    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
    updateMonth();
    // 내역 리스트 갱신 함수 호출
  });

  nextBtn.addEventListener("click", () => {
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
    updateMonth();
    // 내역 리스트 갱신 함수 호출
  });

  // 탭 클릭 시 active 변경 및 화면 전환
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  updateMonth();
}

window.initHeader = initHeader;
