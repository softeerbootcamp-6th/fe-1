export const bindValidation = (fields, btn) => {
    // 폼의 필드와 제출 버튼을 인자로 받아 유효성 검사를 수행하는 함수
    const v = () => {
        const ok = fields.every(f => (f.type === 'select-one') ? f.selectedIndex > 0 : f.value.trim());
        btn.disabled = !ok; btn.classList.toggle('active', ok);
    };
    // 각 필드에 input과 change 이벤트 리스너를 추가하여 사용자가 입력할 때마다 유효성 검사 수행
    ['input', 'change'].forEach(evt =>
        fields.forEach(el =>
            el.addEventListener(evt, v)));
    v();
};
