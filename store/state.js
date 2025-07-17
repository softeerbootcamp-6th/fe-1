export const sharedState = {
  //수입 지출 요소
  isIncome: true,
  selectedMethod: null,
  selectedCategory: null,

  // 필터링 상태
  showIncome: true,
  showExpense: true,
  totalIncome: 0,
  totalExpense: 0,
  entryId: null,

  entries: [],

  // 뷰 관련 상태
  activeView: "ledger",
  calendarInitialized: false,
  statsInitialized: false,
};
