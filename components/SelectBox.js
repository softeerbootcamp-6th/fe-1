export function renderSelectBox(optionStringList, editable) {
  let isVisible = false;
  const selectBox = document.createElement("div");
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
  optionList.style.display = "none"; // 초기에는 숨김

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
    optionItem.appendChild(optionDelButton);

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
    const selectedOption = e.target.closest("li");
    selectButton.textContent = selectedOption.textContent;
    selectBox.value = e.target.textContent;
    optionList.style.display = "none";

    // change 이벤트 발생
    const changeEvent = new Event("change", { bubbles: true });
    selectBox.dispatchEvent(changeEvent);
  });

  // 선택 버튼 클릭 시 옵션 리스트 토글
  selectButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    isVisible = !isVisible;
    if (isVisible) {
      optionList.style = "flex";
    } else {
      optionList.style.display = "none";
    }
  });

  // 외부 클릭 시 옵션 리스트 숨기기
  document.addEventListener("click", (e) => {
    if (!selectBox.contains(e.target)) {
      optionList.style.display = "none";
    }
  });

  return selectBox;
}
