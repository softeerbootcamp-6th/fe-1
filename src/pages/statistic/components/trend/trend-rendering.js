
export function renderTrendChart() {
  return `
    <div class="trend-chart" id="trend-chart"></div>

  `;
}

// 통계 페이지용 카테고리별 지출 내역 렌더링 함수
export async function renderExpenseHistoryList(transactions, category) {
  //TODO[규진] - 메인 페이지 스타일 로드(추후에 시간이 남으면 컴포넌트화 후 해당 컴포넌트만 로드하도록 수정)
  // loadCSS("src/pages/main/main.css"); // This line is removed as per the new_code
  // 확장된 렌더링 함수 사용
  // return renderHistoryListWithFilter(transactions, (data) => // This line is removed as per the new_code
  //   getFilteredExpenseDataByCategory(data, category) // This line is removed as per the new_code
  // ); // This line is removed as per the new_code
}
