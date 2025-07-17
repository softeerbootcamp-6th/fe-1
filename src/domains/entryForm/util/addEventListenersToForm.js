import {
  fillCats,
  handleAddNewMethod,
  toggleSign,
} from './formOptionHandlers.js';
import { showModal } from '../../../shared/components/modal.js';
import { selectFormElements } from './selectFormElements.js';
import { PostFormData, PutFormData } from './formDataApi.js';
import { generateFormData } from './generateFormData.js';

const addEventListenerToSignBtn = ({ els }) => {
  // 부호 버튼 클릭 시 부호를 토글하고 카테고리 옵션을 다시 채움
  els.signBtn.addEventListener('click', () => {
    toggleSign({ els });
    fillCats({ els });
  });
};

const addEventListenerToMethSel = ({ els }) => {
  // 결제수단 셀렉트 박스에서 '추가' 옵션을 선택했을 때 모달을 띄워 새 결제수단을 추가
  els.methSel.addEventListener('change', (e) => {
    if (e.target.value !== 'add-form-method') return;
    // '추가' 옵션이 선택되면 모달을 띄워 새 결제수단을 입력받음
    // 모달 내의 추가 버튼 클릭 시 showModal의 파라미터로 지정한 함수가 호출됨
    // 분리된 함수를 참조하여 모달에 전달
    showModal((newMeth) => handleAddNewMethod(els.methSel, newMeth));
    // 모달이 닫히면 결제수단 셀렉트 박스의 선택을 초기화
    els.methSel.selectedIndex = 0;
  });
};

const addEventListenerToSubmitBtn = ({
  formEl,
  summaryStore,
  selectedEntryStore,
}) => {
  // 폼 제출 버튼 클릭 시 이벤트 핸들러
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    // 선택된 엔트리가 있다면 PUT 요청을 통해 업데이트
    const selectedEntry = selectedEntryStore.getState().selectedEntry;
    const data = generateFormData({
      els: selectFormElements({ formEl }),
      existingId: selectedEntry ? selectedEntry.id : null,
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
  });
};

// 이벤트리스너들을 등록하는 함수
export const addEventListeners = ({
  els,
  formEl,
  summaryStore,
  selectedEntryStore,
}) => {
  addEventListenerToSignBtn({ els });

  addEventListenerToMethSel({ els });

  addEventListenerToSubmitBtn({ formEl, summaryStore, selectedEntryStore });
};
