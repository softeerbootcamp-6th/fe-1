export function renderSelectBox(optionStringList, editable, deletable) {
  console.log(optionStringList);
  const selectBox = document.createElement("div"); //div value설정이 안됨. dataset.value로 설정
  selectBox.className = "select-box";

  // 가상 DOM 조각
  const fragment = document.createDocumentFragment();

  // select button
  const selectButton = document.createElement("button");
  selectButton.className = "select-button";

  const selectButtonSpan = document.createElement("span");
  selectButtonSpan.className = "select-button-span semibold12";
  selectButtonSpan.textContent = "선택하세요";

  const selectButtonIcon = document.createElement("img");
  selectButtonIcon.className = "select-button-icon";
  selectButtonIcon.src = "../assets/icons/chevron-down.svg";
  selectButtonIcon.style.width = "1rem";
  selectButtonIcon.style.height = "1rem";

  selectButton.appendChild(selectButtonSpan);
  selectButton.appendChild(selectButtonIcon);

  // option list
  const optionList = document.createElement("ul");
  optionList.className = "option-list";

  selectBox.appendChild(selectButton);
  selectBox.appendChild(optionList);

  optionStringList.forEach((optionString) => {
    const optionItem = document.createElement("li");
    optionItem.className = "option-item";

    const optionItemSpan = document.createElement("span");
    optionItemSpan.className = "option-item-span";
    optionItemSpan.textContent = optionString;

    const optionDelButton = document.createElement("button");
    optionDelButton.className = "option-del-button";

    const optionDelIcon = document.createElement("img");
    optionDelIcon.src = "../assets/icons/closed.svg";
    optionDelButton.appendChild(optionDelIcon);

    optionItem.appendChild(optionItemSpan);
    if (deletable) {
      optionItem.appendChild(optionDelButton);
    }
    fragment.appendChild(optionItem);
  });

  const optionButton = document.createElement("button");
  optionButton.className = "option-button";
  optionButton.textContent = "추가하기";

  if (editable) {
    fragment.appendChild(optionButton);
  }

  optionList.appendChild(fragment);

  // 옵션 클릭 시 선택 처리
  optionList.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    // 삭제 버튼 클릭 시
    if (e.target.closest(".option-del-button")) {
      const optionItem = e.target.closest(".option-item");
      if (optionItem) {
        const optionItemText =
          optionItem.querySelector(".option-item-span").textContent;
        const optionDeleteEvent = new CustomEvent("delete-option", {
          detail: {
            optionName: optionItemText,
          },
        });
        document.dispatchEvent(optionDeleteEvent);
        optionItem.remove();
      }
      return;
    }

    // 추가하기 버튼 클릭 시
    if (e.target.closest(".option-button")) {
      const addModalOpenEvent = new Event("add-modal-open");
      document.dispatchEvent(addModalOpenEvent);
      return;
    }

    // 옵션 아이템 클릭 시 선택 처리
    const selectedOption = e.target.closest(".option-item");
    if (selectedOption) {
      const optionSpan = selectedOption.querySelector(".option-item-span");
      if (optionSpan) {
        selectButtonSpan.textContent = optionSpan.textContent;
        selectBox.dataset.value = optionSpan.textContent;
        console.log("선택된 값:", selectBox);
        optionList.classList.remove("active");

        // change 이벤트 발생
        const changeEvent = new Event("select-change", { bubbles: true });
        document.dispatchEvent(changeEvent);
      }
    }
  });

  // 선택 버튼 클릭 시 옵션 리스트 토글
  selectButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    optionList.classList.toggle("active");
  });

  // 외부 클릭 시 옵션 리스트 숨기기
  document.addEventListener("click", (e) => {
    if (!selectBox.contains(e.target)) {
      optionList.classList.remove("active");
    }
  });

  return selectBox;
}
