import { createElement } from "../../utils/dom.js";

import Modal from "../Modal/Modal.js";

const modalContainer = document.getElementById("modal");

const renderSelectItem = ({ option, isEditable, handleClick, onDelete }) => {
  const listItem = document.createElement("li");
  listItem.className = "select-item font-light-12";

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

    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();

      const modal = Modal({
        className: "modal--delete-method",
        type: "delete",
        text: "해당 결제 수단을 삭제하시겠습니까?",
        value: option,
        onConfirm: (value) => {
          listItem.remove();
          onDelete();

          let options = JSON.parse(localStorage.getItem("method"));
          options = options.filter((item) => item !== value);
          localStorage.setItem("method", JSON.stringify(options));
        },
      });

      modalContainer.appendChild(modal);
      modal.showModal();
    });

    selectItemContent.appendChild(deleteButton);
  }

  // 옵션 클릭 이벤트
  listItem.addEventListener("click", handleClick);
  listItem.appendChild(selectItemContent);

  return listItem;
};

const Select = async ({
  label,
  options = [],
  placeholder = "입력하세요",
  isEditable = false,
  onChange,
}) => {
  try {
    const selectElement = await createElement(
      "/src/components/Select/Select.html"
    );

    // 라벨 설정
    const labelElement = selectElement.querySelector(".select__label");
    labelElement.textContent = label;

    // 입력 필드 설정
    const inputElement = selectElement.querySelector(".select-input");
    inputElement.placeholder = placeholder;

    // 옵션 리스트 동적 생성
    const selectList = selectElement.querySelector(".select-list");

    const handleClickItem = (option) => {
      const optionText = typeof option === "string" ? option : option.text;
      inputElement.value = optionText;
      selectList.classList.remove("select-list--open");
      const selectIcon = selectWrapper.querySelector(".select-icon");
      selectIcon.classList.remove("select-icon--open");

      onChange(optionText);
    };

    options.forEach((option) => {
      selectList.appendChild(
        renderSelectItem({
          option,
          isEditable,
          handleClick: () => handleClickItem(option),
          onDelete: () => {
            inputElement.value = "";
            onChange("");
          },
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

      listItem.addEventListener("click", () => {
        const modal = Modal({
          className: "modal--add-method",
          type: "add",
          text: "추가하실 결제 수단을 입력해주세요.",
          placeholder: "카테고리 이름",
          onConfirm: (value) => {
            if (options.includes(value)) {
              alert("이미 존재하는 결제 수단입니다.");
              return;
            }

            if (value === "") {
              alert("결제 수단을 입력해주세요.");
              return;
            }

            const newItem = renderSelectItem({
              option: value,
              isEditable,
              handleClick: () => handleClickItem(value),
            });

            const addButtonItem = selectList.lastElementChild;
            selectList.insertBefore(newItem, addButtonItem);

            options.push(value);
            localStorage.setItem("method", JSON.stringify(options));
          },
        });

        modalContainer.appendChild(modal);
        modal.showModal();
      });

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
    return null;
  }
};

export default Select;
