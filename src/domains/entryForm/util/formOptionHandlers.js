import {
  expenseCategories,
  incomeCategories,
} from '../../../shared/constants/categories.js';

// 금액의 부호를 확인하는 함수
export const isExpense = (els) => els.signBtn.textContent === '-';

// 부호 버튼의 텍스트를 토글하는 함수
export const toggleSign = (els) => {
  els.signBtn.textContent = isExpense(els) ? '+' : '-';
};

// 카테고리 셀렉트 박스를 채우는 함수
// 현재 부호에 따라 수입 또는 지출 카테고리를 채움
export const fillCats = (els) => {
  // 카테고리 셀렉트 박스의 옵션을 초기화, 0번 인덱스인 "선택하세요"를 제외하고 모두 제거
  while (els.catSel.options.length > 1) els.catSel.remove(1);
  (isExpense(els) ? expenseCategories : incomeCategories).forEach(
    ({ value, label }) => els.catSel.appendChild(new Option(label, value)),
  );
};

// 새 결제수단 추가 핸들러 함수
export const handleAddNewMethod = (methodSelect, newMethod) => {
  // 이미 있는 결제수단인지 확인
  const exists = [...methodSelect.options].some(
    (o) => o.textContent.toLowerCase() === newMethod.toLowerCase(),
  );
  if (exists) return;

  // 새 결제수단을 추가할 때는 'custom-' 접두사를 붙여 고유한 ID를 생성
  const customId = `custom-${crypto.randomUUID()}`;
  // 사용자로부터 입력받은 이름과 ID를 사용하여 새로운 옵션 생성
  const opt = new Option(newMethod, customId);
  // 결제수단 셀렉트 박스에 새 옵션을 추가하고 선택 상태로 설정
  methodSelect.insertBefore(opt, methodSelect.lastElementChild);
  opt.selected = true;
};
