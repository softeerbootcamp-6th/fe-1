import { dayGroupHTML } from '../ui/summaryHTMLTemplates.js';
import { calcTotals } from './totalCalc.js';
import { formatSummaryText } from './summaryRenderer.js';

// 모든 날짜 그룹 제거
export const clearDayGroups = ({ summaryEl }) => {
  summaryEl
    .querySelectorAll('article.day-group')
    .forEach((group) => group.remove());
};

// 날짜별 합계 업데이트
export const updateDayTotals = ({ summaryEl, entries }) => {
  [...summaryEl.querySelectorAll('article.day-group')].forEach((group) => {
    const dateEntries = entries.filter(
      (entry) => entry.date === group.dataset.date,
    );
    const total = calcTotals({ list: dateEntries });
    group.querySelector('.day-total').textContent = formatSummaryText({
      calcResult: total,
    });
  });
};

// 날짜별 그룹 엘리먼트 찾기 또는 생성
export const ensureGroup = ({ summaryEl, date }) => {
  let group = summaryEl.querySelector(`[data-date="${date}"]`);
  if (!group) {
    summaryEl.insertAdjacentHTML('beforeend', dayGroupHTML({ date }));
    group = summaryEl.lastElementChild;
  }
  return group;
};
