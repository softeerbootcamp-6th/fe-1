/**
 * CheckBox 컴포넌트
 *
 * // 기본 사용법
 * const checkbox = CheckBox({
 *   label: '동의',
 *   checked: true,
 *   onChange: () => alert('체크됨!')
 * });
 *
 * document.body.appendChild(checkbox);
 */
const CheckBox = ({ label, checked = false, onChange = null } = {}) => {
  const checkboxContainer = document.createElement("div");
  checkboxContainer.className = "checkbox-container";

  // 숨겨진 실제 checkbox input 생성
  const checkboxInput = document.createElement("input");
  checkboxInput.type = "checkbox";
  checkboxInput.id = "checkbox-input";
  checkboxInput.checked = checked;
  checkboxInput.style.display = "none"; // 숨김 처리

  // 시각적 아이콘 생성
  const checkboxIcon = document.createElement("img");
  checkboxIcon.className = "checkbox-icon";
  checkboxIcon.src = checked
    ? "./assets/icons/checkbox-circle.svg"
    : "./assets/icons/uncheckbox-circle.svg";
  checkboxIcon.alt = checked ? "checked" : "unchecked";

  // 라벨 생성
  const labelElement = document.createElement("label");
  labelElement.className = "checkbox-label font-light-12";
  labelElement.textContent = label;
  labelElement.for = checkboxInput.id;
  labelElement.htmlFor = checkboxInput.id; // label과 input 연결

  // 요소들을 컨테이너에 추가
  checkboxContainer.appendChild(checkboxInput);
  checkboxContainer.appendChild(checkboxIcon);
  checkboxContainer.appendChild(labelElement);

  const handelToggleCheckbox = (e) => {
    const isChecked = e.target.checked;
    checkboxIcon.src = isChecked
      ? "./assets/icons/checkbox-circle.svg"
      : "./assets/icons/uncheckbox-circle.svg";
    checkboxIcon.alt = isChecked ? "checked" : "unchecked";
    checkboxInput.checked = isChecked;

    if (onChange) {
      onChange(isChecked);
    }
  };

  // input의 change 이벤트 리스너 추가
  checkboxInput.addEventListener("change", (e) => handelToggleCheckbox(e));

  // 아이콘 클릭 시 input 토글
  checkboxIcon.addEventListener("click", (e) => handelToggleCheckbox(e));

  return checkboxContainer;
};

export default CheckBox;
