// js/index.js
import { initCalendar } from "./function/header.js";
import { initInputForm } from "./function/input-form.js";
import { initListener } from "./listener/totalListener.js"; 
import { deleteEntries } from "./function/entry.js";
initCalendar({
  onUpdate: (year, month) => {
    renderPageFor(year, month);
  }
});

initInputForm();
initListener();
deleteEntries(); // 더미 데이터 삭제