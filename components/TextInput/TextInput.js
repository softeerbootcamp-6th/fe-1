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

// 기본 input
const defaultInput = TextInput({
  label: "이름",
  placeholder: "이름을 입력하세요",
  state: "enabled",
  onChange: (e) => console.log("Value:", e.target.value),
});

// textarea
const textarea = TextInput({
  type: "textAreaOnly",
  label: "설명",
  placeholder: "설명을 입력하세요",
  state: "enabled",
  onChange: (e) => console.log("Textarea value:", e.target.value),
});

document.querySelector(".text-input-component").appendChild(defaultInput);
document.querySelector(".text-input-component").appendChild(textarea);
