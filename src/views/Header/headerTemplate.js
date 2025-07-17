export const headerTemplate = `
  <header class="header">
    <div class="header__contents">
      <h1 class="header__title font-serif-24">Wise Wallet</h1>
      <div class="header__month-container">
        <button class="header__month-button month-button--prev">
          <img src="/src/assets/icons/chevron-left.svg" alt="arrow-left" />
        </button>
        <div class="header__month-info">
          <span class="header__year font-light-14"></span>
          <span class="header__month font-serif-48"></span>
          <span class="header__month-name font-light-14"></span>
        </div>
        <button class="header__month-button month-button--next">
          <img src="/src/assets/icons/chevron-right.svg" alt="arrow-right" />
        </button>
      </div>
      <ul class="header__nav">
        <li class="header__nav-item" data-id="home">
          <button class="header__nav-button" type="button">
            <img src="/src/assets/icons/doc.svg" alt="home" />
          </button>
        </li>
        <li class="header__nav-item" data-id="calendar">
          <button class="header__nav-button" type="button">
            <img src="/src/assets/icons/calendar.svg" alt="calendar" />
          </button>
        </li>
        <li class="header__nav-item" data-id="chart">
          <button class="header__nav-button" type="button">
            <img src="/src/assets/icons/chart.svg" alt="chart" />
          </button>
        </li>
      </ul>
    </div>
  </header>
`;
