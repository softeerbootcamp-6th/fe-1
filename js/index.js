// js/index.js
import { initCalendar } from "./function/header.js";
import { initInputForm } from "./function/input-form.js";
import { initListener } from "./listener/totalListener.js"; 
import { deleteEntries } from "./function/entry/entry.js";
import { initFilterButtons } from "./function/filterEntries.js";
import { initViewSwitcher } from "./function/viewSwitcher.js";
import { updateCalendarTotalAmount } from './function/calendarTotalAmount.js';

// 헤더 초기화 (월 선택 기능)
initCalendar();

// 기본 기능 초기화
initInputForm();
initListener();
deleteEntries(); // 삭제 기능 초기화
initFilterButtons(); // 필터링 기능 초기화

// 뷰 전환 기능 초기화
initViewSwitcher();

// Initialize calendar totals
updateCalendarTotalAmount();