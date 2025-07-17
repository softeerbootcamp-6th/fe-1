import { isExpense } from './formOptionHandlers.js';

// 데이터 생성
export const generateFormData = ({ els, existingId = null }) => {
  return {
    id: existingId || crypto.randomUUID(), // 기존 ID가 있으면 사용, 없으면 새로 생성
    date: els.date.value,
    sign: isExpense(els) ? '-' : '+',
    amount: +els.amtInp.value.replace(/,/g, ''),
    memo: els.memoInp.value.trim(),
    category: {
      value: els.catSel.value,
      text: els.catSel.selectedOptions[0].textContent,
    },
    method: {
      value: els.methSel.value,
      text: els.methSel.selectedOptions[0].textContent,
    },
  };
};
