import DropDownBlock from "./DropDownBlock.js";

function DropDown({ options, editable, id, onChange, onAdd, onDelete }) {
    let isOpen = false;

    const renderOptions = (optionsList) =>
        optionsList
            .map(
                (option) =>
                    DropDownBlock({ id: option, value: option, editable }).element
            )
            .join("") +
        (editable
            ? `<li class="option-list flex-row" value="추가하기">추가하기</li>`
            : "");

    return {
        element: `
            <div class="category-field" id="${id}">
                <div class="selectedDropDown flex-row">
                    <div class="selected-value selected-value-placeholder">선택하세요</div>
                    <div class="arrow">
                        <img src="assets/icons/chevron-down.svg" alt="arrow" />
                    </div>
                </div>
                <ul class="dropdown-block-container" style="display: none;">
                    ${renderOptions(options)}
                </ul>
            </div>
        `,
        init: () => {
            const dropdown = document.getElementById(id);
            const selectedValue = dropdown.querySelector(".selectedDropDown");
            const dropdownList = dropdown.querySelector(
                ".dropdown-block-container"
            );

            selectedValue.addEventListener("click", () => {
                isOpen = !isOpen;
                if (isOpen) {
                    dropdownList.style.display = "block";
                    selectedValue.classList.add("rotate");
                } else {
                    dropdownList.style.display = "none";
                    selectedValue.classList.remove("rotate");
                }
            });

            dropdownList.addEventListener("click", (event) => {
                const li = event.target.closest("li.option-list");
                if (!li) return;

                const value = li.getAttribute("value");

                // 삭제 버튼이 눌렸는지 확인
                if (event.target.closest("button.icon-button")) {
                    if (editable && typeof onDelete === "function") {
                        onDelete(value); // value 기반 삭제 요청
                    }
                    event.stopPropagation();
                    return;
                }

                // "추가하기" 항목 클릭
                if (editable && value === "추가하기") {
                    if (typeof onAdd === "function") onAdd();
                    return;
                }

                const selectedText = selectedValue.querySelector(".selected-value");
                selectedText.textContent = event.target.textContent.trim();
                dropdown.value = event.target.textContent.trim();

                selectedText.classList.remove("selected-value-placeholder");
                dropdownList.style.display = "none";

                if (typeof onChange === "function") {
                    onChange(dropdown.value);
                }

            });
        },
        updateOptions: (newOptions) => {
            const dropdownList = document
                .getElementById(id)
                .querySelector(".dropdown-block-container");
            dropdownList.innerHTML = renderOptions(newOptions);
        },
    };
}
export default DropDown;