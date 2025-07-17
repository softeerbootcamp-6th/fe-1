import { store } from "./store.js";
import { recordStore } from "./recordStore.js";
import { renderRecords, renderRecordHeader } from "../scripts/records.js";
import { updateHeaderDateUI } from "../scripts/header.js";

export function subscribeStore() {
  recordStore.subscribe((records) => {
    const { year, month } = store.getDate();
    renderRecordHeader(year, month, records);
    renderRecords(year, month, records);
  });
  store.subscribeDate(({ year, month }) => {
    const records = recordStore.getRecords();

    updateHeaderDateUI(year, month);
    renderRecordHeader(year, month, records);
    renderRecords(year, month, records);
  });
}
