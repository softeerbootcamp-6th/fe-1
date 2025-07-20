import { renderView } from '../util/viewRenderers.js';
import { handleEntryDelete, handleEntrySelect } from '../util/entryHandlers.js';
import { subscribeToStores } from '../util/storeSubscribers.js';

const addEventListenersToSummaryEl = ({
  summaryStore,
  selectedEntryStore,
  summaryEl,
  entryKeyMap,
}) => {
  summaryEl.addEventListener('click', (e) => {
    handleEntryDelete({ e, entryKeyMap, summaryStore });
    handleEntrySelect({ e, entryKeyMap, summaryStore, selectedEntryStore });
  });
};

export const initSummaryView = ({
  summaryEl,
  summaryStore,
  dateStore,
  selectedEntryStore,
}) => {
  // 항목 키와 ID의 매핑을 저장하는 객체
  const entryKeyMap = new Map();
  const dateState = dateStore.getState();

  // 이벤트 리스너 등록
  addEventListenersToSummaryEl({
    summaryStore,
    selectedEntryStore,
    summaryEl,
    entryKeyMap,
  });

  // Store 구독
  subscribeToStores({
    summaryStore,
    dateStore,
    summaryEl,
    entryKeyMap,
  });

  // 초기 렌더링
  renderView({
    dateState,
    summaryStore,
    entryKeyMap,
    summaryEl,
  });
};
