import { recordStore } from "./recordStore.js";
import { dateStore } from "./dateStore.js";
import { renderRecords, renderRecordHeader } from "../scripts/records/recordRender.js";
import { updateHeaderDateUI } from "../scripts/header.js";
import { initPage } from "../scripts/router.js";
import { initCalanderHeader } from "../scripts/calander/calanderUtils.js";

export function subscribeStore() {
  recordStore.subscribe((records) => {
    const { year, month } = dateStore.getDate();
    renderRecordHeader(year, month, records);
    renderRecords(year, month, records);
  });
  dateStore.subscribe(({ year, month }) => {
    const records = recordStore.getRecords();
    updateHeaderDateUI(year, month);

    switch (window.location.hash) {
      case "#main":
        renderRecordHeader(year, month, records);
        renderRecords(year, month, records);
        break;
      case "#calander":
        initCalanderHeader();
        break;
      default:
        renderRecordHeader(year, month, records);
        renderRecords(year, month, records);
    }
  });
}
