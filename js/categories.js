export const expenseCategories = [
    { value: 'life', label: '생활' }, { value: 'food', label: '식비' },
    { value: 'transport', label: '교통' }, { value: 'shopping', label: '쇼핑/뷰티' },
    { value: 'health', label: '의료/건강' }, { value: 'culture', label: '문화/여가' },
    { value: 'nocategory', label: '미분류' }
];

export const incomeCategories = [
    { value: 'salary', label: '월급' },
    { value: 'allowance', label: '용돈' },
    { value: 'etc', label: '기타 수입' }
];

// <select> 요소(카테고리들), isExpense(bool)(부호가 -인지) 전달
export const fillCategoryOptions = (selEl, isExpense) => {
    while (selEl.options.length > 1) selEl.remove(1);   // placeholder 제외
    // isExpense에 따라 expenseCategories 또는 incomeCategories로 list로 설정
    const list = isExpense ? expenseCategories : incomeCategories;
    // list의 각 항목을 <option>으로 추가
    list.forEach(({ value, label }) => selEl.appendChild(new Option(label, value)));
};