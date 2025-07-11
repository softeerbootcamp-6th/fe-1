// js/index.js
import { initCalendar } from "./header.js";
import { initInputForm } from "./function/input-form.js";
import { initListener } from "./listener/totalListener.js"; 

initCalendar({
  onUpdate: (year, month) => {
    renderPageFor(year, month);
  }
});

initInputForm();
initListener();