import { calcTotals } from './totalCalc.js';

// 수입/지출 요약 텍스트 생성
export const formatSummaryText = ({ calcResult }) => {
  return `수입 ${calcResult.inc.toLocaleString('ko-KR')}원   지출 ${calcResult.exp.toLocaleString('ko-KR')}원`;
};

// 전체 합계 업데이트
export const updateTotalSummary = ({ summaryEl, entries }) => {
  const totals = calcTotals(entries);
  summaryEl.querySelector('.total.count').textContent =
    `전체 내역 ${totals.count}건`;
  summaryEl.querySelector('.total.income-spend').textContent =
    formatSummaryText({ calcResult: totals });
};
