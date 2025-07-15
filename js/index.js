// js/index.js
import { initCalendar } from "./function/header.js";
import { initInputForm } from "./function/input-form.js";
import { initListener } from "./listener/totalListener.js"; 
import { deleteEntries } from "./function/entry.js";
import { initFilterButtons } from "./function/filterEntries.js";

initCalendar({
  onUpdate: (year, month) => {
    renderPageFor(year, month);
  }
});

initInputForm();
initListener();
deleteEntries(); // 삭제 기능 초기화
initFilterButtons(); // 필터링 기능 초기화