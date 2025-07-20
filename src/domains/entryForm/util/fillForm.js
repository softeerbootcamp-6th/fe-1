// 폼에 선택한 엔트리가 있다면 해당 엔트리의 데이터를 폼에 채우는 함수
import { selectFormElements } from './selectFormElements.js';
import { validateFormFields } from './formValidator.js';
import { fillCats } from './formOptionHandlers.js';

export const fillFormWithSelectedEntryState = ({
  formEl,
  selectedEntryState,
}) => {
  const selectedEntry = selectedEntryState.selectedEntry;
  if (!selectedEntry) return;

  const els = selectFormElements({ formEl });
  els.date.value = selectedEntry.date;
  els.signBtn.textContent = selectedEntry.sign;
  // 카테고리 옵션을 부호에 따라 채움
  fillCats({ els });

  els.amtInp.value = selectedEntry.amount.toLocaleString('ko-KR');
  els.memoInp.value = selectedEntry.memo;
  els.methSel.value = selectedEntry.method.value;
  els.catSel.value = selectedEntry.category.value;

  // 폼 요소가 입력될 때 유효성 검사를 수행하고, 유효한 경우에만 제출 버튼을 활성화
  validateFormFields({
    fields: [els.date, els.amtInp, els.memoInp, els.methSel, els.catSel],
    btn: els.submit,
  });
};
