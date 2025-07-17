import { store } from "./store.js";
import { renderRecords, renderRecordHeader } from "./records.js";
import { updateHeaderDateUI } from "./header.js";

export function subscribeStore() {
  store.subscribe((records) => {
    const { year, month } = store.getDate();
    renderRecordHeader(year, month, records);
    renderRecords(year, month, records);
  });
  store.subscribeDate(({ year, month }) => {
    const records = store.getRecords();

    updateHeaderDateUI(year, month);
    renderRecordHeader(year, month, records);
    renderRecords(year, month, records);
  });
}
