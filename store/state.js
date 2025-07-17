export const sharedState = {
  // 필터링 상태
  showIncome: true,
  showExpense: true,
  totalIncome: 0,
  totalExpense: 0,

  entries: [],

  // 뷰 관련 상태
  activeView: "ledger",
  calendarInitialized: false,
  statsInitialized: false,
};
