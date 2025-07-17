import { postDummyData, putDummyData } from '../../../shared/data/dummyData.js';
import { resetForm } from './resetForm.js';
import { selectFormElements } from './selectFormElements.js';

export const PutFormData = ({
  selectedEntry,
  data,
  formEl,
  selectedEntryStore,
  summaryStore,
}) => {
  // 선택된 엔트리가 있다면 PUT 요청을 통해 업데이트
  putDummyData(selectedEntry.id, data)
    .then(() => {
      // store에 선택된 항목을 업데이트
      selectedEntryStore.dispatch('ENTRY/SELECT/CLEAR', data);
      resetForm(selectFormElements(formEl));
      summaryStore.dispatch('ENTRY/UPDATE', data);
    })
    .catch((err) => {
      console.error('Error updating entry:', err);
    });
};

export const PostFormData = ({ formEl, data, summaryStore }) => {
  // 서버에 데이터를 전송하고, 성공적으로 추가되면 상태를 업데이트
  postDummyData(data)
    .then(() => {
      // store에 새 항목을 추가
      summaryStore.dispatch('ENTRY/ADD', data);
      resetForm(selectFormElements(formEl));
    })
    .catch((err) => {
      console.error('Error adding entry:', err);
    });
};
