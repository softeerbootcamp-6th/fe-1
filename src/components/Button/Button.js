/**
 * Button 컴포넌트
 *
 * // 기본 사용법
 * const btn = Button({
 *   icon: './assets/icons/check.svg',
 *   label: '확인',
 *   size: 'large',
 * });
 *
 * document.body.appendChild(btn);
 */
const Button = ({
  icon = null,
  label = null,
  size = "medium", // 'small', 'medium', 'large'
  onClick = null,
} = {}) => {
  const button = document.createElement("button");
  button.className = `button button--${size}`;

  // 아이콘이 있는 경우 아이콘 추가
  if (icon) {
    const iconElement = document.createElement("img");
    iconElement.className = `button__icon icon--${size}`;
    iconElement.src = icon;
    iconElement.alt = "button-icon";
    button.appendChild(iconElement);
  }

  // 라벨이 있는 경우 텍스트 추가
  if (label) {
    const labelElement = document.createElement("span");

    // 사이즈별 폰트 클래스 적용
    let fontClass = "";
    switch (size) {
      case "large":
        fontClass = "font-serif-48";
        break;
      case "medium":
        fontClass = "font-semibold-16";
        break;
      case "small":
        fontClass = "font-semibold-12";
        break;
      default:
        fontClass = "font-semibold-16";
    }

    labelElement.className = `button__text ${fontClass}`;
    labelElement.textContent = label;
    button.appendChild(labelElement);
  }

  // 클릭 이벤트 리스너 추가
  if (onClick) {
    button.addEventListener("click", onClick);
  }

  return button;
};

export default Button;
