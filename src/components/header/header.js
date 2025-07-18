export default function createHeader() {
  // const
  const header = document.createElement("div");
  header.className = "header";
  header.innerHTML = `
    <div class="inter-header">
    <div>
      <a href="index.html" class="logo">
        <img src="../assets/icons/logo.svg" alt="Wise Wallet" />
      </a>
    </div>
    <div class="center-block">
      <div class="month-selector">
        <div class="year" id="year">2023</div>
        <div class="month-control">
          <button id="prev-month" class="nav-btn">
            <img src="../assets/icons/chevron-left.svg" alt="이전 달" />
          </button>
          <div class="month" id="month">8</div>
          <button id="next-month" class="nav-btn">
            <img src="../assets/icons/chevron-right.svg" alt="이전 달" />
          </button>
        </div>
        <div class="month-label" id="month-label">August</div>
      </div>
    </div>

    <div class="view-options">
      <button class="icon-btn active">
        <img src="../assets/icons/doc.svg" alt="목록 보기" />
      </button>
      <button class="icon-btn">
        <img src="../assets/icons/calendar.svg" alt="달력 보기" />
      </button>
      <button class="icon-btn">
        <img src="../assets/icons/chart.svg" alt="설정" />
      </button>
    </div>
  </div>
  `;

  return header;
}
