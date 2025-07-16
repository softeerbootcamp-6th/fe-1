const TextInput = ({
  type = "default", // 'default' | 'textAreaOnly'
  state = "enabled", // 'enabled' | 'active' | 'disabled' | 'error'
  placeholder = "",
  value = "",
  disabled = false,
} = {}) => {
  // 입력 요소 생성
  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.className = `text-input font-semibold-12 text-input--${type} text-input--${state}`;
  inputElement.placeholder = placeholder;
  inputElement.value = value;
  inputElement.disabled = disabled;

  // 상태에 따른 속성 설정
  if (state === "disabled") {
    inputElement.disabled = true;
  }

  return inputElement;
};

export default TextInput;
