// 폼 요소들을 선택하는 함수
export const selectFormElements = ({ formEl }) => {
  return {
    date: formEl.querySelector('#form-date'),
    signBtn: formEl.querySelector('#form-sign'),
    catSel: formEl.querySelector('#form-category'),
    methSel: formEl.querySelector('#form-method'),
    amtInp: formEl.querySelector('#form-amount'),
    memoInp: formEl.querySelector('#form-memo'),
    submit: formEl.querySelector('.submit-btn'),
  };
};
