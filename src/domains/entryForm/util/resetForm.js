export const resetForm = (els) => {
  // 폼 요소를 초기화
  els.memoInp.value = els.amtInp.value = '';
  els.catSel.selectedIndex = els.methSel.selectedIndex = 0;
  // 날짜 입력 필드는 오늘 날짜로 설정
  els.date.value = new Date().toISOString().split('T')[0];
  // 부호 버튼은 기본값인 '-'로 설정
  els.signBtn.textContent = '-';
};
