import { renderView } from './viewRenderers.js';
import { handleDateChange } from './entryHandlers.js';

export const subscribeToStores = ({
  summaryStore,
  dateStore,
  summaryEl,
  entryKeyMap,
}) => {
  dateStore.subscribe((state) =>
    handleDateChange({
      state,
      summaryStore,
      entryKeyMap,
      summaryEl,
    }),
  );

  summaryStore.subscribe(() =>
    renderView({
      dateState: dateStore.getState(),
      summaryStore,
      entryKeyMap,
      summaryEl,
    }),
  );
};
