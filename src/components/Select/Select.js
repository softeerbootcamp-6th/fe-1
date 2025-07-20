import { selectTemplate } from "./SelectTemplate.js";

/**
 * Select 컴포넌트
 *
 * // 기본 사용법
 * const select = await Select({
 *   name: 'method',
 *   label: '결제수단',
 *   options: methodList,
 *   isEditable: true,
 *   selected: method,
 * });
 *
 * document.body.appendChild(select);
 */
const renderSelectItem = ({ option, isEditable }) => {
  const listItem = document.createElement("li");
  listItem.className = "select-item font-light-12";
  listItem.dataset.value = option;

  const selectItemContent = document.createElement("div");
  selectItemContent.className = "select-item__content";

  const optionLabel = document.createElement("span");
  optionLabel.textContent = option;

  selectItemContent.appendChild(optionLabel);

  if (isEditable) {
    const deleteButton = document.createElement("button");
    deleteButton.className = "select-item__delete-button";
    deleteButton.type = "button";

    const deleteButtonIcon = document.createElement("img");
    deleteButtonIcon.src = "/src/assets/icons/closed-red.svg";
    deleteButtonIcon.alt = "delete-item";
    deleteButton.appendChild(deleteButtonIcon);

    selectItemContent.appendChild(deleteButton);
  }

  // 옵션 클릭 이벤트
  listItem.appendChild(selectItemContent);

  return listItem;
};

const Select = async ({
  name,
  label,
  options = [],
  placeholder = "입력하세요",
  isEditable = false,
  selected = "",
}) => {
  try {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = selectTemplate;
    const selectElement = tempDiv.firstElementChild;

    // 라벨 설정
    const labelElement = selectElement.querySelector(".select__label");
    labelElement.textContent = label;

    // 입력 필드 설정
    const inputElement = selectElement.querySelector(".select-input");
    inputElement.name = name;
    inputElement.placeholder = placeholder;
    inputElement.value = selected;

    // 옵션 리스트 동적 생성
    const selectList = selectElement.querySelector(".select-list");

    options.forEach((option) => {
      selectList.appendChild(
        renderSelectItem({
          option,
          isEditable,
        })
      );
    });

    if (isEditable) {
      const listItem = document.createElement("li");
      listItem.className = "select-item font-light-12";

      const selectItemContent = document.createElement("div");
      selectItemContent.className = "select-item__content";

      const addButton = document.createElement("button");
      addButton.className = "select-item__add-button";
      addButton.textContent = "추가하기";
      addButton.type = "button";

      selectItemContent.appendChild(addButton);
      listItem.appendChild(selectItemContent);

      selectList.appendChild(listItem);
    }

    // 셀렉트 토글 이벤트
    const selectWrapper = selectElement.querySelector(".select-wrapper");
    selectWrapper.addEventListener("click", () => {
      selectList.classList.toggle("select-list--open");
      const selectIcon = selectWrapper.querySelector(".select-icon");
      selectIcon.classList.toggle("select-icon--open");
    });

    // 외부 클릭시 닫기
    document.addEventListener("click", (e) => {
      if (!selectElement.contains(e.target)) {
        selectList.classList.remove("select-list--open");
        const selectIcon = selectWrapper.querySelector(".select-icon");
        selectIcon.classList.remove("select-icon--open");
      }
    });

    return selectElement;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default Select;
