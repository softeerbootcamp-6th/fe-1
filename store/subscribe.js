import { recordStore } from "./recordStore.js";
import { dateStore } from "./dateStore.js";
import { renderRecords, renderRecordHeader } from "../scripts/records.js";
import { updateHeaderDateUI } from "../scripts/header.js";

export function subscribeStore() {
  recordStore.subscribe((records) => {
    const { year, month } = dateStore.getDate();

    renderRecordHeader(year, month, records);
    renderRecords(year, month, records);
  });

  dateStore.subscribe(({ year, month }) => {
    const records = recordStore.getRecords();

    updateHeaderDateUI(year, month);
    renderRecordHeader(year, month, records);
    renderRecords(year, month, records);
  });
}
