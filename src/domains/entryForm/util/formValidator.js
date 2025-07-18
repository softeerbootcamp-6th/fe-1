// 폼의 필드와 제출 버튼을 인자로 받아 유효성 검사를 수행하는 함수
export const validateFormFields = ({ fields, btn }) => {
  // 모든 필드가 유효한지 검사하고 버튼 상태를 업데이트
  const isValid = fields.every((f) =>
    f.type === 'select-one' ? f.selectedIndex > 0 : f.value.trim(),
  );

  btn.disabled = !isValid;
  btn.classList.toggle('active', isValid);

  return isValid;
};
