// 금액 input: 숫자만 + 3자리 콤마
export const addCommaFormatter = inp =>
  inp.addEventListener('input', e => {
    e.target.value = e.target.value
      .replace(/[^0-9]/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  });

// 폼의 값들과 제출 버튼을 인자로 받음
export const bindValidation = (fields, submitBtn) => {
  const validate = () => {
    // 각 필드의 타입이 select-one이면 선택된 인덱스가 0이 아니고,
    // 그 외의 필드는 값이 공백이 아니어야 함
    const ok = fields.every(f =>
      (f.type === 'select-one')
        ? f.selectedIndex > 0
        : f.value.trim());
    // 제출 버튼의 disabled 속성을 ok에 따라 설정
    // active 클래스는 ok가 true일 때만 추가
    submitBtn.disabled = !ok;
    submitBtn.classList.toggle('active', ok);
  };
  // 각 폼의 요소에 input과 change 이벤트 리스너를 추가
  // input 이벤트는 사용자가 입력할 때마다, change 이벤트는 선택이 바뀔 때마다 validate 함수 호출
  ['input', 'change'].forEach(evt =>
    fields.forEach(el => el.addEventListener(evt, validate)));
  // 초기 상태에서 validate 함수 호출
  validate();
};