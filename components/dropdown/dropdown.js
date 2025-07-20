export function createDropdown(
  container,
  {
    items = [],
    dropdownName = "",
    dropdownValue = "",
    required = true,
    addItem = false,
    addItemText = "추가하기",
  }
) {
  container.innerHTML = `
      <div class="dropdown-item-container flex-column">
        ${items
          .map(
            (item) =>
              `<div class="dropdown-item flex-between light-12" data-value="${item}">
                <div>${item}</div>
                <button type="button" class="danger-btn">
                  삭제
                </button>
              </div>
            `
          )
          .join("")}
          ${
            addItem
              ? `<div class="dropdown-add-content flex-between light-12 dropdown-item">
                  ${addItemText}
                </div>`
              : ""
          }
      </div>
      <input type="hidden" name="${dropdownName}" value="${dropdownValue}" ${
    required ? "required" : ""
  } />
  `;
}

export function renderDropdown(
  container,
  {
    items = [],
    dropdownName = "",
    dropdownValue = "",
    required = true,
    addItem = false,
    addItemText = "추가하기",
  }
) {
  createDropdown(container, {
    items,
    dropdownName,
    dropdownValue,
    required,
    addItem,
    addItemText,
  });
}

export function initDropdown(
  container,
  {
    dropdownName = "",
    selectedItem = (item) => {},
    deleteItem = () => {},
    addItem = () => {},
  }
) {
  container.addEventListener("click", (e) => {
    // 삭제 버튼 클릭 처리
    if (e.target.closest(".danger-btn")) {
      e.stopPropagation(); // 이벤트 버블링 방지
      const itemToDelete = e.target.closest(".dropdown-item");
      if (itemToDelete) {
        deleteItem(itemToDelete.dataset.value);
      }
      return;
    }

    // 추가하기 클릭 처리
    if (e.target.closest(".dropdown-add-content")) {
      e.stopPropagation();
      const addItemElement = e.target.closest(".dropdown-item");
      if (addItemElement) {
        addItem(addItemElement.dataset.value);
      }
      return;
    }

    // 일반 영역 클릭 처리
    const clickedItem = e.target.closest(".dropdown-item");
    if (
      clickedItem &&
      !clickedItem.classList.contains("dropdown-add-content")
    ) {
      const selectedValue = clickedItem.dataset.value;
      const selectedText = clickedItem.querySelector("div").textContent;

      // 선택된 아이템 텍스트 업데이트
      const selectedElement = container.querySelector(".dropdown-selected");
      if (selectedElement) {
        selectedElement.textContent = selectedText;
      }

      selectedItem(selectedValue);

      // hidden input 값 업데이트
      const hiddenInput = container.querySelector(
        `input[name="${dropdownName}"]`
      );
      if (hiddenInput) {
        hiddenInput.value = selectedValue;
      }
    }

    closeDropdown(container);
  });
}

export function closeDropdown(container) {
  container.classList.remove("open");
}

export function openDropdown(container) {
  container.classList.add("open");
}
