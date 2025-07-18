import { entryHTML } from '../ui/summaryHTMLTemplates.js';
import { ensureGroup } from './groupRenderer.js';

// 키-ID 매핑 관리 함수
export const updateEntryKeyMap = ({ renderedElements, entryKeyMap }) => {
  renderedElements.forEach((item) => {
    entryKeyMap.set(item.key, item.id);
  });
};

// 항목 하나를 DOM에 렌더링하는 함수
export const renderSingleEntry = ({ group, entry }) => {
  const entriesContainer = group.querySelector('.entries');
  const uniqueKey = crypto.randomUUID();
  const html = entryHTML({ entry, entryKey: uniqueKey });
  entriesContainer.insertAdjacentHTML('beforeend', html);
  return {
    key: uniqueKey,
    id: entry.id,
    element: entriesContainer.lastElementChild,
  };
};

// 여러 항목을 렌더링하는 함수
export const renderEntries = ({ summaryEl, entries }) => {
  const renderedItems = [];
  entries.forEach((entry) => {
    const group = ensureGroup({ summaryEl, date: entry.date });
    const renderedItem = renderSingleEntry({ group, entry });
    renderedItems.push(renderedItem);
  });
  return renderedItems;
};
