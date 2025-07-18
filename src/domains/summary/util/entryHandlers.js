import { deleteDummyData } from '../../../shared/data/dummyData.js';
import { renderView } from './viewRenderers.js';

// 항목 삭제 처리
export const handleEntryDelete = ({ e, entryKeyMap, summaryStore }) => {
  const deleteButton = e.target.closest('.delete-btn');
  if (!deleteButton) return;

  const entryItem = deleteButton.closest('.entry');
  if (!entryItem || !entryItem.dataset.entryKey) return;

  // 키-ID 맵에서 실제 ID 조회
  const entryKey = entryItem.dataset.entryKey;
  const entryId = entryKeyMap.get(entryKey);

  if (!entryId) return;

  deleteDummyData({ id: entryId })
    .then(() => {
      // 성공적으로 삭제된 후 상태 업데이트
      summaryStore.dispatch('ENTRY/REMOVE', { id: entryId });
    })
    .catch((error) => {
      console.error('Error deleting entry:', error);
    });
};

// 항목 선택 처리 함수
export const handleEntrySelect = ({
  e,
  entryKeyMap,
  summaryStore,
  selectedEntryStore,
}) => {
  // 삭제 버튼이 클릭된 경우는 무시
  if (e.target.closest('.delete-btn')) return;

  // entry 항목 요소를 찾음
  const entryItem = e.target.closest('.entry');
  if (!entryItem || !entryItem.dataset.entryKey) return;

  // 키-ID 맵에서 실제 ID 조회
  const entryKey = entryItem.dataset.entryKey;
  const entryId = entryKeyMap.get(entryKey);

  if (!entryId) return;

  // 해당 ID의 항목 데이터 찾기
  const selectedEntry = (summaryStore.getState().entries || []).find(
    (entry) => entry.id === entryId,
  );

  if (!selectedEntry) return;

  // 선택된 항목을 스토어에 디스패치
  selectedEntryStore.dispatch('ENTRY/SELECT', selectedEntry);
};

// dateStore 상태 변경 처리
export const handleDateChange = ({
  state,
  summaryStore,
  entryKeyMap,
  summaryEl,
}) => {
  renderView({ dateState: state, summaryStore, entryKeyMap, summaryEl });
};
