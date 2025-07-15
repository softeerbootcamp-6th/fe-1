// js/index.js
import { initCalendar } from "./function/header.js";
import { initInputForm } from "./function/input-form.js";
import { initListener } from "./listener/totalListener.js"; 
import { deleteEntries, updateDateSectionTotals } from "./function/entry.js";
import { initFilterButtons } from "./function/filterEntries.js";
import { initViewSwitcher } from "./function/viewSwitcher.js";
import { updateCalendarView } from "./function/calendarView.js";
import { updateStatsView } from "./function/statsView.js";
import { sharedState } from "./state/state.js";

// 헤더 초기화 (월 선택 기능)
initCalendar({
  onUpdate: (year, month) => {
    // 월이 변경될 때 현재 보고 있는 뷰에 따라 다르게 업데이트
    if (sharedState.activeView === 'calendar') {
      updateCalendarView(year, month);
    } 
    else if (sharedState.activeView === 'stats') {
      updateStatsView();
    }
  }
});

// 기본 기능 초기화
initInputForm();
initListener();
deleteEntries(); // 삭제 기능 초기화
initFilterButtons(); // 필터링 기능 초기화

// 뷰 전환 기능 초기화
initViewSwitcher();