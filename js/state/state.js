export const sharedState = {
  //수입 지출 요소
  isIncome: true, // true면 수입, false면 지출
  toggleSign: document.getElementById("toggle-sign"),
  selectedMethod: null,
  selectedCategory: null,

  // 필터링 상태
  showIncome: true, // 수입 내역 표시 여부
  showExpense: true, // 지출 내역 표시 여부
  totalIncome: 0,
  totalExpense: 0,
  entryId: null, // 현재 수정 중인 항목의 ID
  //결제 금액 요소
  amount : document.getElementById("amount"),


  //내용 32자 제한 요소
  charCount: document.getElementById("char-count"),
  descInput: document.getElementById("desc"),

  //결제수단 드롭박스 요소
  dropdownDisplay: document.getElementById("dropdown-display"),
  dropdownPanel: document.getElementById("dropdown-panel"),

  //모달 요소
  modal: document.getElementById("modal"),
  confirmAdd: document.getElementById("confirm-add"),
  cancelAdd: document.getElementById("cancel-add"),
  newMethodInput: document.getElementById("new-method"),
  methodWrapper: document.getElementById("method-wrapper"),

  entries: [], // 서버에서 가져온 항목들을 저장할 배열

  // 뷰 관련 상태
  activeView: 'ledger', // 현재 활성화된 뷰 (ledger, calendar, stats)
  calendarInitialized: false, // 캘린더 뷰 초기화 여부
  statsInitialized: false, // 통계 뷰 초기화 여부
}


import { DateStore } from "./store.js"
export const dateStore = new DateStore({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1, // 월은 0부터
});