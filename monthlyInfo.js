export function createMonthlyInfo() {
  const monthlyInfoTemplate = `
    <div class="flex-row">
      <div>전체 내역 13건</div>
      <div class="flex-row">
        <input
          type="checkbox"
          checked
        />
        <div>수입 2,010,580</div>
      </div>
      <div class="flex-row">
        <input
          type="checkbox"
          checked
        />
        <div>지출 798,180</div>
      </div>
    </div>
    `;

  return monthlyInfoTemplate;
}

export function renderMonthlyInfo(container) {
  container.innerHTML = createMonthlyInfo();
}
