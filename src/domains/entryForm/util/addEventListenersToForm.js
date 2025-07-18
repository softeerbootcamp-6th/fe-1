import {
  fillCats,
  handleAddNewMethod,
  toggleSign,
} from './formOptionHandlers.js';
import { showModal } from '../../../shared/components/modal.js';
import { selectFormElements } from './selectFormElements.js';
import { PostFormData, PutFormData } from './formDataApi.js';
import { generateFormData } from './generateFormData.js';
import { validateFormFields } from './formValidator.js';

// 부호 버튼 클릭 처리
const handleSignButtonClick = ({ els }) => {
  toggleSign({ els });
  fillCats({ els });
};

// 결제수단 변경 처리
const handleMethodChange = ({ els, value }) => {
  if (value !== 'add-form-method') return;

  // '추가' 옵션이 선택되면 모달을 띄워 새 결제수단을 입력받음
  // 모달 내의 추가 버튼 클릭 시 showModal의 파라미터로 지정한 함수가 호출됨
  // 분리된 함수를 참조하여 모달에 전달
  showModal((newMethod) =>
    handleAddNewMethod({ methodSelect: els.methSel, newMethod }),
  );
  els.methSel.selectedIndex = 0;
};

// 폼 제출 처리
const handleFormSubmit = ({ formEl, summaryStore, selectedEntryStore }) => {
  const selectedEntry = selectedEntryStore.getState().selectedEntry;
  const data = generateFormData({
    els: selectFormElements({ formEl }),
    existingId: selectedEntry?.id || null,
  });

  selectedEntry
    ? PutFormData({
        selectedEntry,
        data,
        formEl,
        selectedEntryStore,
        summaryStore,
      })
    : PostFormData({ formEl, data, summaryStore });
};

// 클릭 이벤트 핸들러
const handleClickEvent = (event, { els }) => {
  if (event.target !== els.signBtn) return;
  handleSignButtonClick({ els });
};

// 입력 이벤트 핸들러
const handleInputEvent = (event, { fields, els }) => {
  if (!fields.includes(event.target)) return;
  validateFormFields({ fields, btn: els.submit });
};

// 변경 이벤트 핸들러
const handleChangeEvent = (event, { fields, els }) => {
  if (fields.includes(event.target)) {
    validateFormFields({ fields, btn: els.submit });
  }

  if (event.target === els.methSel) {
    handleMethodChange({ els, value: event.target.value });
  }
};

// 제출 이벤트 핸들러
const handleSubmitEvent = (
  event,
  { formEl, summaryStore, selectedEntryStore },
) => {
  event.preventDefault();
  handleFormSubmit({ formEl, summaryStore, selectedEntryStore });
};

// 이벤트리스너들을 등록하는 함수
export const addEventListeners = ({
  els,
  formEl,
  summaryStore,
  selectedEntryStore,
}) => {
  const fields = [els.date, els.amtInp, els.memoInp, els.methSel, els.catSel];
  const eventHandlers = [
    { type: 'click', handler: (e) => handleClickEvent(e, { els }) },
    { type: 'input', handler: (e) => handleInputEvent(e, { fields, els }) },
    { type: 'change', handler: (e) => handleChangeEvent(e, { fields, els }) },
    {
      type: 'submit',
      handler: (e) =>
        handleSubmitEvent(e, { formEl, summaryStore, selectedEntryStore }),
    },
  ];

  // 이벤트 리스너 등록
  eventHandlers.forEach(({ type, handler }) => {
    formEl.addEventListener(type, handler);
  });

  // 초기 유효성 검사 실행
  validateFormFields({ fields, btn: els.submit });
};
