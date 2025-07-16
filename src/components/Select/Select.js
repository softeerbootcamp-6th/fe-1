import { createHTML } from "../../utils/dom.js";
import Modal from "../Modal/Modal.js";

const modalContainer = document.getElementById("modal");

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

    deleteButton.addEventListener("click", async (e) => {
      e.stopPropagation();

      const modal = Modal({
        className: "modal--delete-method",
        type: "delete",
        text: "해당 결제 수단을 삭제하시겠습니까?",
        value: option,
        onConfirm: async (value) => {
          try {
            const currentMethods = await getMethods();
            const updatedMethods = currentMethods.filter(
              (item) => item !== value
            );
            await updateMethods(updatedMethods);

            listItem.remove();
          } catch (error) {
            console.error("Error deleting method:", error);
            alert("결제 수단 삭제에 실패했습니다.");
          }
        },
      });

      modalContainer.appendChild(modal);
      modal.showModal();
    });

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
    const selectElement = await createHTML(
      "/src/components/Select/Select.html"
    );
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

      listItem.addEventListener("click", () => {
        const modal = Modal({
          className: "modal--add-method",
          type: "add",
          text: "추가하실 결제 수단을 입력해주세요.",
          placeholder: "카테고리 이름",
          onConfirm: async (value) => {
            if (options.includes(value)) {
              alert("이미 존재하는 결제 수단입니다.");
              return;
            }

            if (value === "") {
              alert("결제 수단을 입력해주세요.");
              return;
            }

            try {
              const currentMethods = await getMethods();
              const updatedMethods = [...currentMethods, value];
              await updateMethods(updatedMethods);

              const newItem = renderSelectItem({
                option: value,
                isEditable,
              });

              const addButtonItem = selectList.lastElementChild;
              selectList.insertBefore(newItem, addButtonItem);

              options.push(value);
            } catch (error) {
              console.error("Error adding method:", error);
              alert("결제 수단 추가에 실패했습니다.");
            }
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
