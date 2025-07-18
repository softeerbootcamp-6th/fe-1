// 필터 ( 수입 / 지출만 보기 ) 토글 상태 관리를 위한 모듈
export const filterState = {
  incomeVisible: true,
  outcomeVisible: true,

  toggle(type) {
    if (type === "income") this.incomeVisible = !this.incomeVisible;
    if (type === "outcome") this.outcomeVisible = !this.outcomeVisible;
  },
};
