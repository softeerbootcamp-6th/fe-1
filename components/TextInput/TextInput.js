/**
 * TextInput 컴포넌트
 *
 * // 기본 사용법
 * const input = TextInput({
 *   type: 'default', // 'default' | 'textAreaOnly'
 *   state: 'enabled', // 'enabled' | 'active' | 'disabled' | 'error'
 *   placeholder: '이름을 입력하세요',
 *   value: '',
 *   onChange: (e) => console.log(e.target.value)
 * });
 *
 * document.body.appendChild(input);
 */
const TextInput = ({
  type = "default", // 'default' | 'textAreaOnly'
  state = "enabled", // 'enabled' | 'active' | 'disabled' | 'error'
  placeholder = "",
  value = "",
  onChange = null,
  onFocus = null,
  onBlur = null,
} = {}) => {
  // 입력 요소 생성
  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.className = `text-input font-semibold-12 text-input--${type} text-input--${state}`;
  inputElement.placeholder = placeholder;
  inputElement.value = value;

  // 상태에 따른 속성 설정
  if (state === "disabled") {
    inputElement.disabled = true;
  }

  // 이벤트 리스너 추가
  if (onChange) {
    inputElement.addEventListener("input", onChange);
  }

  if (onFocus) {
    inputElement.addEventListener("focus", onFocus);
  }

  if (onBlur) {
    inputElement.addEventListener("blur", onBlur);
  }

  return inputElement;
};

export default TextInput;
