import { addCommaFormatter } from '../util/numberFormatter.js';
import { validateFormFields } from '../util/formValidator.js';
import { fillCats } from '../util/formOptionHandlers.js';
import { selectFormElements } from '../util/selectFormElements.js';
import { fillFormWithSelectedEntryState } from '../util/fillForm.js';
import { addEventListeners } from '../util/addEventListenersToForm.js';

// 폼 요소에서 필요한 요소들을 선택, 폼 초기값 설정, 포멧터 적용, 부호에 따라 카테고리 옵션 채움, 유효성 검사 수행
const initFormSettings = (els) => {
  // 날짜 입력 필드의 초기값을 오늘 날짜로 설정
  els.date.value = new Date().toISOString().split('T')[0];

  // 금액 입력 필드에 천 단위 구분 기호를 추가하는 포맷터를 적용
  addCommaFormatter(els.amtInp);

  // 부호에 따라 카테고리 옵션을 채우는 함수 호출
  fillCats(els);

  // 폼 요소가 입력될 때 유효성 검사를 수행하고, 유효한 경우에만 제출 버튼을 활성화
  validateFormFields(
    [els.date, els.amtInp, els.memoInp, els.methSel, els.catSel],
    els.submit,
  );
};

export const initFormView = ({ formEl, summaryStore, selectedEntryStore }) => {
  // 폼 요소에서 필요한 요소들을 선택
  const els = selectFormElements(formEl);

  initFormSettings(els);

  selectedEntryStore.subscribe((state) => {
    fillFormWithSelectedEntryState({ formEl, selectedEntryState: state });
  });

  addEventListeners({ els, formEl, summaryStore, selectedEntryStore });
};
