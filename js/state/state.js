export const sharedState = {
  //수입 지출 요소
  isIncome: true, // true면 수입, false면 지출
  toggleSign: document.getElementById("toggle-sign"),
  selectedMethod: null,
  selectedCategory: null,

  entryId: null, // 현재 수정 중인 항목의 ID
  //결제 금액 요소
  amount : document.getElementById("amount"),


  //내용 32자 제한 요소
  charCount: document.getElementById("char-count"),
  descInput: document.getElementById("desc"),

  //결제수단 드롭박스 요소
  dropdownDisplay: document.getElementById("dropdown-display"),
  dropdownPanel: document.getElementById("dropdown-panel"),
  dropdownAddBtn: document.getElementById("dropdown-add"),

  //모달 요소
  modal: document.getElementById("modal"),
  confirmAdd: document.getElementById("confirm-add"),
  cancelAdd: document.getElementById("cancel-add"),
  newMethodInput: document.getElementById("new-method"),
  methodWrapper: document.getElementById("method-wrapper"),

  //카테고리 드롭박스 요소
  categoryWrapper: document.getElementById("category-wrapper"),
  categoryDisplay: document.getElementById("category-display"),
  categoryPanel: document.getElementById("category-panel"),



  entries: [] // 서버에서 가져온 항목들을 저장할 배열
}